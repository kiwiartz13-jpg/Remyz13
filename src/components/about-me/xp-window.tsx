import type { ReactNode } from "react";

/** Border/radius treatment of the window body. */
export type XpFrame = "mood" | "panel" | "section";
/** Title-bar padding: 0.5em, 0.7em or 1em in the original layout. */
export type XpTitlePad = "sm" | "md" | "lg";

const FRAME: Record<XpFrame, string> = {
    mood: "rounded-t-[11px] border-x-2 border-b-2 border-[#1b44b8] bg-white",
    panel: "rounded-t-[11px] border-l-[3px] border-r-2 border-b-2 border-[#1b44b8] bg-white",
    section: "rounded-t-[10px] border-2 border-[#1b44b8]",
};

const TITLE_FRAME: Record<XpFrame, string> = {
    mood: "border-2 border-[#1b44b8]",
    panel: "border-2 border-[#1b44b8]",
    section: "",
};

const TITLE_PAD: Record<XpTitlePad, string> = {
    sm: "p-[0.5em]",
    md: "p-[0.7em]",
    lg: "p-[1em]",
};

export const XP_TITLE_BAR =
    "block rounded-t-[10px] bg-[image:var(--xp-title-bar)] bg-cover bg-center bg-no-repeat bg-clip-padding font-xp text-[1em] text-white [text-shadow:2px_2px_0_#000]";

export default function XpWindow({
    frame,
    titlePad = "md",
    icon,
    title,
    asHeading = true,
    className = "",
    children,
}: {
    frame: XpFrame;
    titlePad?: XpTitlePad;
    icon?: string;
    title: ReactNode;
    /** False for bars the original drew with ::before content — plain, unbolded text. */
    asHeading?: boolean;
    className?: string;
    children?: ReactNode;
}) {
    const label = (
        <>
            {icon ? `${icon} ` : ""}
            {title}
        </>
    );

    return (
        <div className={`shadow-[5px_8px_10px_#0006] ${FRAME[frame]} ${className}`}>
            <div className={`${XP_TITLE_BAR} ${TITLE_FRAME[frame]} ${TITLE_PAD[titlePad]}`}>
                {asHeading ? <h4 className="m-0 inline-block font-bold">{label}</h4> : label}
            </div>
            {children}
        </div>
    );
}
