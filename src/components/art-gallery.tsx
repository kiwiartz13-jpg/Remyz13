import { useMemo, useState } from "react"

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
            name: path.split("/").pop()!.replace(IMAGE_EXTENSIONS, ""),
        }));
}

export default function ArtGallery({ folder, subfolder }: ArtGalleryProps) {
    const images = useMemo(() => shuffle(getImages(folder, subfolder)), [folder, subfolder]);
    const [selected, setSelected] = useState<ArtImage | null>(null);

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="columns-3 gap-4 w-full">
                {images.map((image) => (
                    <div
                        key={image.src}
                        className="group relative mb-4 break-inside-avoid cursor-pointer"
                        onClick={() => setSelected(image)}
                    >
                        <img src={image.src} className="w-full h-auto block" />
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
