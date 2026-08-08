import type { CSSProperties } from "react";

const modules = import.meta.glob("../../assets/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF,webp,WEBP,svg,SVG}", {
    eager: true,
    import: "default",
}) as Record<string, string>;

function getImages(folder: string): string[] {
    const dir = `/${folder.replace(/^\/+|\/+$/g, "")}/`;
    return Object.keys(modules)
        .filter((path) => path.includes(dir))
        .sort()
        .map((path) => modules[path]);
}


export default function BlinkieRoller() {
    const images = getImages("assets/about-me/blinkies");

    return (
        <div className="overflow-hidden ml-3.5 mr-3.5">
            <div
                style={{ "--marquee-duration": `${images.length * 3}s` } as CSSProperties}
                className="animate-marquee flex w-max items-center hover:[animation-play-state:paused] gap-0.5"
            >
                {[...images, ...images].map((src, i) => (
                    <img key={`${src}-${i}`} src={src} alt="" className="block max-w-none" />
                ))}
            </div>
        </div>
    );
}