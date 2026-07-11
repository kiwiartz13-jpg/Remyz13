import { useEffect, useMemo, useRef, useState } from "react"

const srcsetModules = import.meta.glob("../art/*/*/*.{jpg,JPG,jpeg,JPEG,png,PNG}", {
    eager: true,
    query: "?w=400;800;1600&format=webp&as=srcset",
    import: "default",
}) as Record<string, string>;

const lowResModules = import.meta.glob("../art/*/*/*.{jpg,JPG,jpeg,JPEG,png,PNG}", {
    eager: true,
    query: "?w=64&format=webp&quality=50",
    import: "default",
}) as Record<string, string>;

const metaModules = import.meta.glob(["../art/*/*/*.{jpg,JPG,jpeg,JPEG,png,PNG}", "../art/*/*/*.{gif,GIF}"], {
    eager: true,
    query: "?as=metadata:width;height",
    import: "default",
}) as Record<string, { width: number; height: number }>;

const gifModules = import.meta.glob("../art/*/*/*.{gif,GIF}", {
    eager: true,
    query: "?url",
    import: "default",
}) as Record<string, string>;

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

type ArtGalleryProps = {
    folder: string,
    subfolder?: string,
    years?: number | number[],
    columns?: number,
    gap?: number,
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
    path: string,
    name: string,
    width: number,
    height: number,
    ratio: number,
    srcset?: string,
    lowSrc?: string,
    fullSrc: string,
}

function largestFromSrcset(srcset: string): string {
    const last = srcset.split(",").pop()!.trim();
    return last.split(/\s+/)[0];
}

const allImages: ArtImage[] = Object.entries(metaModules).map(([path, meta]) => {
    const srcset = srcsetModules[path];
    const hasDimensions = meta && typeof meta.width === "number" && typeof meta.height === "number";
    return {
        path,
        name: path.split("/").pop()!.replace(IMAGE_EXTENSIONS, "").replaceAll("_", " ").trim(),
        width: hasDimensions ? meta.width : 1,
        height: hasDimensions ? meta.height : 1,
        ratio: hasDimensions ? meta.width / meta.height : 1,
        srcset,
        lowSrc: lowResModules[path],
        fullSrc: srcset ? largestFromSrcset(srcset) : gifModules[path],
    };
});

function getImages(folder: string, subfolder?: string): ArtImage[] {
    return allImages.filter((image) => {
        const [, , pathFolder, pathSubfolder] = image.path.split("/");
        return pathFolder === folder && (subfolder === undefined || pathSubfolder === subfolder);
    });
}

function useContainerWidth(): [React.RefObject<HTMLDivElement | null>, number] {
    const ref = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, width];
}

function ProgressiveImage({ image, sizes, eager, onClick }: {
    image: ArtImage,
    sizes: string,
    eager: boolean,
    onClick: () => void,
}) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className="group relative cursor-pointer overflow-hidden"
            style={{ aspectRatio: image.ratio }}
            onClick={onClick}
        >
            {image.lowSrc && !loaded && (
                <img
                    src={image.lowSrc}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}
            <img
                src={image.fullSrc}
                srcSet={image.srcset}
                sizes={image.srcset ? sizes : undefined}
                width={image.width}
                height={image.height}
                loading={eager ? "eager" : "lazy"}
                fetchPriority={eager ? "high" : undefined}
                decoding="async"
                alt={image.name}
                onLoad={() => setLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            />
            <div className="
                absolute bottom-0 left-0 w-full bg-[#00000070] text-white px-2 py-1
                opacity-0 group-hover:opacity-100 pointer-coarse:opacity-100
                transition-opacity text-sm max-[400px]:text-[9px]"
            >
                {image.name}
            </div>
        </div>
    );
}

const MOBILE_BREAKPOINT = 768;

export default function ArtGallery({ folder, subfolder, years, columns = 3, gap = 16 }: ArtGalleryProps) {
    const yearsKey = JSON.stringify(years);
    const images = useMemo(
        () => shuffle(getImages(folder, subfolder).filter((image) => matchesYears(image.name, years))),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [folder, subfolder, yearsKey]
    );
    const [selected, setSelected] = useState<ArtImage | null>(null);
    const [containerRef, containerWidth] = useContainerWidth();

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
            img.src = selected.fullSrc;
        }, 150);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
            link.href = original;
        };
    }, [selected]);

    const empty = images.length === 0;

    const maxColumns = Math.max(1, Math.floor(columns));
    const columnCount = containerWidth < MOBILE_BREAKPOINT
        ? Math.min(2, maxColumns)
        : maxColumns;
    const tileWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
    const sizes = `${Math.max(1, Math.round(tileWidth))}px`;

    const columnItems: ArtImage[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights = new Array(columnCount).fill(0);
    for (const image of images) {
        let target = 0;
        for (let c = 1; c < columnCount; c++) {
            if (columnHeights[c] < columnHeights[target]) target = c;
        }
        columnItems[target].push(image);
        columnHeights[target] += 1 / image.ratio;
    }

    return (
        <div ref={containerRef} className="w-full h-full overflow-y-auto relative">
            {empty && (
                <div className="absolute inset-0 flex items-center justify-center text-white/60">
                    no art :(
                </div>
            )}
            {containerWidth > 0 && (
                <div className="flex w-full items-start" style={{ gap }}>
                    {columnItems.map((column, columnIndex) => (
                        <div key={columnIndex} className="flex-1 flex flex-col" style={{ gap }}>
                            {column.map((image, itemIndex) => (
                                <ProgressiveImage
                                    key={image.path}
                                    image={image}
                                    sizes={sizes}
                                    eager={itemIndex === 0}
                                    onClick={() => setSelected(image)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in cursor-pointer"
                    onClick={() => setSelected(null)}
                >
                    <img
                        src={selected.fullSrc}
                        srcSet={selected.srcset}
                        sizes="90vw"
                        className="max-w-[90vw] max-h-[90vh] animate-lightbox-in"
                    />
                </div>
            )}
        </div>
    );
}
