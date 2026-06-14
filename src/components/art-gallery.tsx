import { useEffect, useMemo, useState } from "react"

// Eagerly imports every file one folder deep inside src/art (art/<folder>/<subfolder>/<file>)
const artModules = import.meta.glob("../art/*/*/*", {
    eager: true,
    query: "?url",
    import: "default",
}) as Record<string, string>;

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

type ArtGalleryProps = {
    folder: string,
    subfolder?: string,
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
            // path looks like "../art/<folder>/<subfolder>/<file>"
            const [, , pathFolder, pathSubfolder] = path.split("/");
            return pathFolder === folder && (subfolder === undefined || pathSubfolder === subfolder);
        })
        .map(([path, url]) => ({
            src: url,
            // a leading "_" displays as "#" since "#" can't be used in filenames
            name: path.split("/").pop()!.replace(IMAGE_EXTENSIONS, "").replaceAll("_", " ").trim(),
        }));
}

// Preloads images purely to read their aspect ratios so we can reserve each
// tile's height before it renders, keeping the masonry layout from reflowing.
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
                // Fall back to a square so a broken image doesn't block the reveal.
                setRatios((prev) => ({ ...prev, [image.src]: 1 }));
            };
            loader.src = image.src;
        });
        return () => { cancelled = true; };
    }, [images]);

    return ratios;
}

export default function ArtGallery({ folder, subfolder }: ArtGalleryProps) {
    const images = useMemo(() => shuffle(getImages(folder, subfolder)), [folder, subfolder]);
    const [selected, setSelected] = useState<ArtImage | null>(null);

    const ratios = useAspectRatios(images);
    const ready = images.length > 0 && images.every((image) => ratios[image.src] !== undefined);

    return (
        <div className="w-full h-full overflow-y-auto relative">
            {!ready && (
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
