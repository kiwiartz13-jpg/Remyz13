import { useMemo } from "react"

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

function getImages(folder: string, subfolder?: string): string[] {
    return Object.entries(artModules)
        .filter(([path]) => {
            if (!IMAGE_EXTENSIONS.test(path)) return false;
            // path looks like "../art/<folder>/<subfolder>/<file>"
            const [, , pathFolder, pathSubfolder] = path.split("/");
            return pathFolder === folder && (subfolder === undefined || pathSubfolder === subfolder);
        })
        .map(([, url]) => url);
}

export default function ArtGallery({ folder, subfolder }: ArtGalleryProps) {
    const images = useMemo(() => shuffle(getImages(folder, subfolder)), [folder, subfolder]);

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="columns-3 gap-4 w-full">
                {images.map((src) => (
                    <img key={src} src={src} className="w-full h-auto mb-4 break-inside-avoid" />
                ))}
            </div>
        </div>
    );
}
