import { useEffect, useRef, useState } from "react"

import calender from "../assets/menu-buttons/calender.gif"
import calenderStart from "../assets/menu-buttons/calender-start.png"
import calenderEnd from "../assets/menu-buttons/calender-end.png"

type Button = {
    onClick: () => void;
    onRelease?: () => void;
    img: string,
    hoverImg?: string
    w?: number,
    h?: number
}

type TopMenuProps = {
    homeButton: Button,
    menuButtons: Button[],
}

type MenuButtonProps = Button & {
    selected?: boolean,
    onToggle?: () => void,
}

function MenuButton({ onClick, onRelease, img, hoverImg, w = 175, h = 175, selected = false, onToggle }: MenuButtonProps) {
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
                style={{ width: w, height: h }}
                className={`${selected ? "scale-110" : "hover:scale-105"}`}
            />
        </button>
    )
}

function CalenderButton() {
    const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const gifRef = useRef<HTMLImageElement>(null);

    const handleClick = () => {
        if (phase !== "idle") return;
        // Reset src while gif is still invisible so there's no blank flash
        if (gifRef.current) {
            gifRef.current.src = "";
            gifRef.current.src = calender;
        }
        setPhase("playing");
    };

    useEffect(() => {
        if (phase !== "playing") return;
        timerRef.current = setTimeout(() => setPhase("done"), 1400);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [phase]);

    const playing = phase === "playing";

    return (
        <button
            onClick={handleClick}
            className="border-0 bg-transparent p-0 cursor-pointer relative"
            style={{ width: 125, height: 175 }}
        >
            <img
                ref={gifRef}
                src={calender}
                style={{ width: 125, height: 175 }}
                className={`absolute top-0 left-0 ${playing ? "opacity-100" : "opacity-0"}`}
            />
            <img
                src={calenderStart}
                style={{ width: 125, height: 175 }}
                className={`absolute top-0 left-0 ${phase === "idle" ? "opacity-100 hover:scale-105" : "opacity-0"}`}
            />
            <img
                src={calenderEnd}
                style={{ width: 125, height: 175 }}
                className={`${phase === "done" ? "opacity-100" : "opacity-0"}`}
            />
        </button>
    );
}

export function TopMenu({ homeButton, menuButtons }: TopMenuProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <div className="flex justify-between items-center w-full pl-5 pt-2 ">
            <div className="flex flex-row gap-15">
                <MenuButton {...homeButton} />
                <CalenderButton />
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
