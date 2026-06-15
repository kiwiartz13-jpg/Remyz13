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

function useAspectRatios(images: ArtImage[]): Record<string, number> {
    const [ratios, setRatios] = useState<Record<string, number>>({});

    useEffect(() => {
        let cancelled = false;
        images.forEach((image) => {
            const loader = new Image();
            loader.onload = () => {
                if (cancelled) return;
                setRatios((prev) => ({
                    ...prev,
                    [image.src]: loader.naturalWidth / loader.naturalHeight,
                }));
            };
            loader.onerror = () => {
                if (cancelled) return;
                setRatios((prev) => ({ ...prev, [image.src]: 1 }));
            };
            loader.src = image.src;
        });
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
    const ready = !empty && images.every((image) => ratios[image.src] !== undefined);

    return (
        <div className="w-full h-full overflow-y-auto relative">
            {empty && (
                <div className="absolute inset-0 flex items-center justify-center text-white/60">
                    no art :(
                </div>
            )}
            {!empty && !ready && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
            )}
            <div className={`columns-3 gap-4 w-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
                {images.map((image) => (
                    <div
                        key={image.src}
                        className="group relative mb-4 break-inside-avoid cursor-pointer"
                        onClick={() => setSelected(image)}
                    >
                        <img
                            src={image.src}
                            style={{ aspectRatio: ratios[image.src] }}
                            className="w-full h-auto block"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-[#00000070] text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {image.name}
                        </div>
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
