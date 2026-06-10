import { parseImageConfig } from "../utils/parseImageConfig"

export type ImageConfig = React.CSSProperties

type HoverImgButtonProps = {
    img: string,
    subImg?: string,
    subImgConfig?: string,
    imgConfig: string,
    onClick: () => void
}

export default function HoverSizeButton({ img, subImg, subImgConfig, imgConfig, onClick }: HoverImgButtonProps) {
    const buttonStyle: React.CSSProperties = { position: "absolute", ...parseImageConfig(imgConfig) };

    return (
        <>
            <button
                onClick={onClick}
                style={buttonStyle}
                className="border-0 bg-transparent p-0 cursor-pointer"
            >
                <img className={`hover:scale-105`} 
                    src={img} style={{ width: "100%", height: "100%" }} 
                />
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
