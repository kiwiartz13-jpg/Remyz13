import { useEffect, useMemo, useState } from "react"

const artModules = import.meta.glob("../art/*/*/*", {
    eager: true,
    query: "?url",
    import: "default",
}) as Record<string, string>;

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

type ArtGalleryProps = {
    folder: string,
    subfolder?: string,
    years?: number | number[],
}

function matchesYears(name: string, years?: number | number[]): boolean {
    if (years === undefined) return true;
    const list = Array.isArray(years) ? years : [years];
    return list.some((year) => name.includes(String(year)));
}

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

type ArtImage = {
    src: string,
    name: string,
}

function getImages(folder: string, subfolder?: string): ArtImage[] {
    return Object.entries(artModules)
        .filter(([path]) => {
            if (!IMAGE_EXTENSIONS.test(path)) return false;
            const [, , pathFolder, pathSubfolder] = path.split("/");
            return pathFolder === folder && (subfolder === undefined || pathSubfolder === subfolder);
        })
        .map(([path, url]) => ({
            src: url,
            name: path.split("/").pop()!.replace(IMAGE_EXTENSIONS, "").replaceAll("_", " ").trim(),
        }));
}

const LOAD_CONCURRENCY = 4;

function useAspectRatios(images: ArtImage[]): Record<string, number> {
    const [ratios, setRatios] = useState<Record<string, number>>({});

    useEffect(() => {
        let cancelled = false;
        let next = 0;

        const loadNext = () => {
            if (cancelled || next >= images.length) return;
            const image = images[next++];
            const loader = new Image();
            const done = (ratio: number) => {
                if (cancelled) return;
                setRatios((prev) => ({ ...prev, [image.src]: ratio }));
                loadNext();
            };
            loader.onload = () => done(loader.naturalWidth / loader.naturalHeight);
            loader.onerror = () => done(1);
            loader.src = image.src;
        };

        for (let i = 0; i < LOAD_CONCURRENCY; i++) loadNext();
        return () => { cancelled = true; };
    }, [images]);

    return ratios;
}

export default function ArtGallery({ folder, subfolder, years }: ArtGalleryProps) {
    const yearsKey = JSON.stringify(years);
    const images = useMemo(
        () => shuffle(getImages(folder, subfolder).filter((image) => matchesYears(image.name, years))),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [folder, subfolder, yearsKey]
    );
    const [selected, setSelected] = useState<ArtImage | null>(null);
    const [loaded, setLoaded] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
        if (!link || !selected) return;
        const original = link.href;

        let cancelled = false;
        const timer = window.setTimeout(() => {
            const img = new Image();
            img.onload = () => {
                if (cancelled) return;
                const canvas = document.createElement("canvas");
                canvas.width = canvas.height = 64;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.drawImage(img, 0, 0, 64, 64);
                link.href = canvas.toDataURL("image/png");
            };
            img.src = selected.src;
        }, 150);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
            link.href = original;
        };
    }, [selected]);

    const ratios = useAspectRatios(images);
    const empty = images.length === 0;
    let readyCount = 0;
    while (readyCount < images.length && ratios[images[readyCount].src] !== undefined) {
        readyCount++;
    }
    const visible = images.slice(0, readyCount);
    const loading = !empty && visible.length === 0;

    const columnCount = 3;
    const columns: ArtImage[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights = new Array(columnCount).fill(0);
    for (const image of visible) {
        let target = 0;
        for (let c = 1; c < columnCount; c++) {
            if (columnHeights[c] < columnHeights[target]) target = c;
        }
        columns[target].push(image);
        columnHeights[target] += 1 / (ratios[image.src] || 1);
    }

    return (
        <div className="w-full h-full overflow-y-auto relative">
            {empty && (
                <div className="absolute inset-0 flex items-center justify-center text-white/60">
                    no art :(
                </div>
            )}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
            )}
            <div className="flex gap-4 w-full items-start">
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex-1 flex flex-col gap-4">
                        {column.map((image) => (
                            <div
                                key={image.src}
                                className="group relative break-inside-avoid cursor-pointer"
                                onClick={() => setSelected(image)}
                            >
                                <img
                                    src={image.src}
                                    style={{ aspectRatio: ratios[image.src] }}
                                    onLoad={() => setLoaded((prev) => ({ ...prev, [image.src]: true }))}
                                    className={`w-full h-auto block ${loaded[image.src] ? "animate-fade-in opacity-100" : "opacity-0"}`}
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-[#00000070] text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {image.name}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in cursor-pointer"
                    onClick={() => setSelected(null)}
                >
                    <img src={selected.src} className="max-w-[90vw] max-h-[90vh] animate-lightbox-in" />
                </div>
            )}
        </div>
    );
}
