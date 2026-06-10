import { useState } from "react"
import { parseImageConfig } from "../utils/parseImageConfig"

export type ImageConfig = React.CSSProperties

type HoverImgButtonProps = {
    img: string,
    subImg?: string,
    hoverImg?: string,
    subImgConfig?: string,
    imgConfig: string,
    onClick: () => void,
    scale?: boolean
}

export default function HoverImgButton({ img, subImg, hoverImg, subImgConfig, imgConfig, onClick, scale = true }: HoverImgButtonProps) {
    const [hovered, setHovered] = useState(false);
    const buttonStyle: React.CSSProperties = { position: "absolute", ...parseImageConfig(imgConfig) };

    return (
        <>
            <button
                onClick={onClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={buttonStyle}
                className={`border-0 bg-transparent p-0 ${scale ? "cursor-pointer" : ""}`}
            >
                <img className={`${scale ? "hover:scale-103" : ""}`} src={hovered && hoverImg !== undefined ? hoverImg : img} style={{ width: "100%", height: "100%" }} />
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
