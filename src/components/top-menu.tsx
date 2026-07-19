import { useState } from "react";
import CalenderButton, { type YearFilter } from "./calender-button";

export type Button = {
    onClick: () => void;
    onRelease?: () => void;
    img: string,
    hoverImg?: string
    w?: number | string,
    h?: number | string
}

type TopMenuProps = {
    homeButton: Button,
    menuButtons: Button[],
    calenderFilter?: (years: YearFilter | undefined) => void,
    calenderFilters?: [YearFilter, YearFilter, YearFilter, YearFilter],
}

type MenuButtonProps = Button & {
    selected?: boolean,
    onToggle?: () => void,
}

export function MenuButton({ onClick, onRelease, img, hoverImg, w = 175, h = 175, selected = false, onToggle }: MenuButtonProps) {
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
        if (selected) {
            onRelease?.();
        } else {
            onClick();
        }
        onToggle?.();
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border-0 bg-transparent p-0 cursor-pointer"
        >
            {hoverImg && <img src={hoverImg} className="hidden" />}
            <img
                src={hovered && hoverImg !== undefined ? hoverImg : img}
                style={{ width: w, height: "auto", maxHeight: h, objectFit: "contain" }}
                className={`${selected ? "scale-120" : "hover:scale-105"}`}
            />
        </button>
    )
}

export function TopMenu({ homeButton, menuButtons, calenderFilter, calenderFilters }: TopMenuProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <div className="flex justify-between items-center w-full pl-5 pt-2 ">
            <div className="flex flex-row items-center" style={{ gap: "clamp(12px, 3.125vw, 60px)" }}>
                <MenuButton {...homeButton} />
                {calenderFilter && calenderFilters && (
                    <CalenderButton filter={calenderFilter} filters={calenderFilters} />
                )}
            </div>

            <div className="flex items-center">
                {menuButtons.map((menuButton, i) => (
                    <MenuButton
                        key={i}
                        {...menuButton}
                        selected={selectedIndex === i}
                        onToggle={() => setSelectedIndex(selectedIndex === i ? null : i)}
                    />
                ))}
            </div>
        </div>
    )
}
