import type { CSSProperties } from "react";
import type { Page } from "./parseImageConfig";

import defaultWallpaper from "../assets/wallpapers/default.png";
import xpWallpaper from "../assets/wallpapers/windowsxp.png";
import fish from "../assets/wallpapers/fish.jpg";
import plasticbeach from "../assets/wallpapers/plastic.png";

export type Wallpaper = {
    image: string;
    color?: string;
    size?: string;
    position?: string;
    repeat?: string;
};

export const WALLPAPERS: Record<Page, Wallpaper> = {
    "home":         { image: defaultWallpaper },
    "digital":      { image: defaultWallpaper },
    "traditional":  { image: defaultWallpaper },
    "commission":   { image: fish },
    "social-media": { image: plasticbeach },
    "about-me":     { image: xpWallpaper },
};

export function wallpaperStyle(page: Page): CSSProperties {
    const { image, color, size, position, repeat } = WALLPAPERS[page];
    return {
        backgroundColor: color ?? "#1A355E",
        backgroundImage: `url(${image})`,
        backgroundSize: size ?? "cover",
        backgroundPosition: position ?? "center",
        backgroundRepeat: repeat ?? "no-repeat",
    };
}
