import { useState } from "react"
import { parseImageConfig } from "../utils/parseImageConfig"

export type ImageConfig = React.CSSProperties

type HoverButtonProps = {
    img: string,
    subImg?: string,
    hoverImg?: string,
    subImgConfig?: string,
    imgConfig: string,
    onClick: () => void
}

export default function HoverButton({ img, subImg, hoverImg, subImgConfig, imgConfig, onClick }: HoverButtonProps) {
    const [hovered, setHovered] = useState(false);
    const buttonStyle: React.CSSProperties = { position: "absolute", ...parseImageConfig(imgConfig) };

    return (
        <>
            <button
                onClick={onClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={buttonStyle}
                className="border-0 bg-transparent p-0 cursor-pointer"
            >
                <img className="" src={hovered && hoverImg !== undefined ? hoverImg : img} style={{ width: "100%", height: "100%" }} />
            </button>
            {subImg && subImgConfig && (
                <img
                    src={subImg}
                    style={{ position: "absolute", ...parseImageConfig(subImgConfig) }}
                    className=" pointer-events-none"
                />
            )}
        </>
    )
}
