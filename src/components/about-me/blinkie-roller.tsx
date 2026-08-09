import { useEffect, useRef } from "react";

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

const RAMP = 4; 
const MAX_SPEED = 5000; 

export default function BlinkieRoller() {
    const images = getImages("assets/about-me/blinkies");
    const track = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = track.current;
        if (!el) return;

        let copy = el.scrollWidth / 2;
        let base = copy / (images.length * 3);
        let speed = base;
        let offset = 0;
        let hovering = false;
        let last = performance.now();

        const frame = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.1);
            last = now;
            if (hovering) speed = speed >= MAX_SPEED ? 0 : Math.min(speed * RAMP ** dt, MAX_SPEED);
            offset = copy > 0 ? (offset + speed * dt) % copy : 0;
            el.style.transform = `translateX(${offset - copy}px)`;
            id = requestAnimationFrame(frame);
        };
        let id = requestAnimationFrame(frame);

        const enter = () => (hovering = true);
        const leave = () => {
            hovering = false;
            speed = base;
        };
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointerleave", leave);

        const resize = new ResizeObserver(() => {
            copy = el.scrollWidth / 2;
            base = copy / (images.length * 3);
            if (!hovering) speed = base;
        });
        resize.observe(el);

        return () => {
            cancelAnimationFrame(id);
            resize.disconnect();
            el.removeEventListener("pointerenter", enter);
            el.removeEventListener("pointerleave", leave);
        };
    }, [images.length]);

    return (
        <div className="overflow-hidden ml-3.5 mr-3.5">
            <div ref={track} className="flex w-max items-center gap-0.5 will-change-transform">
                {[...images, ...images].map((src, i) => (
                    <img key={`${src}-${i}`} src={src} alt="" className="block max-w-none" />
                ))}
            </div>
        </div>
    );
}
