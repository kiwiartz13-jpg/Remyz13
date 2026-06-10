import type { ImageConfig } from "../components/hover-img-button";

export type Page = "home" | "digital";

const ALLOWED = new Set([
    "width", "height",
    "left", "right", "top", "bottom",
    "transform",
]);

const toCamelCase = (kebab: string) =>
    kebab.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

export function parseImageConfig(css: string): ImageConfig {
    const result: Record<string, string> = {};
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");

    for (const line of stripped.split("\n")) {
        const match = line.match(/^\s*([\w-]+)\s*:\s*(.+?)\s*;/);
        if (!match) continue;
        const [, prop, value] = match;
        if (!ALLOWED.has(prop)) continue;
        result[toCamelCase(prop)] = value;
    }

    return result as ImageConfig;
}
