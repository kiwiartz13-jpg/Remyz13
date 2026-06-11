import { useState } from "react"

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
            <img
                src={hovered && hoverImg !== undefined ? hoverImg : img}
                style={{ width: w, height: h }}
                className={`${selected ? "scale-110" : "hover:scale-105"}`}
            />
        </button>
    )
}

export function TopMenu({ homeButton, menuButtons }: TopMenuProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <div className="flex justify-between items-center w-full pl-5 pt-2 ">
            <MenuButton {...homeButton} />

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
