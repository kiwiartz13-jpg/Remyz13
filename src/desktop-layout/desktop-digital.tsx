import animationImg from "../assets/digital-menu-buttons/animation.png";
import animationText from "../assets/digital-menu-buttons/animation-text.png";
import digitalArtImg from "../assets/digital-menu-buttons/digital-art.png";
import digitalArtText from "../assets/digital-menu-buttons/digital-art-text.png";
import otherImg from "../assets/digital-menu-buttons/other.png";
import otherText from "../assets/digital-menu-buttons/other-text.png";
import photographyImg from "../assets/digital-menu-buttons/photography.png";
import photographyText from "../assets/digital-menu-buttons/photography-text.png";
import homeGif from "../assets/homepage-menu-buttons/logo.gif"
import homeImg from "../assets/homepage-menu-buttons/logo.png"


import animationCss from "../css/desktop-digital-css/animation.txt?raw";
import homeCss from "../css/desktop-digital-css/home.txt?raw";
import animationTextCss from "../css/desktop-digital-css/animation-text.txt?raw";
import digitalArtCss from "../css/desktop-digital-css/digital-art.txt?raw";
import digitalArtTextCss from "../css/desktop-digital-css/digital-art-text.txt?raw";
import otherCss from "../css/desktop-digital-css/other.txt?raw";
import otherTextCss from "../css/desktop-digital-css/other-text.txt?raw";
import photographyCss from "../css/desktop-digital-css/photography.txt?raw";
import photographyTextCss from "../css/desktop-digital-css/photography-text.txt?raw";



import { useState } from "react";

import HoverSizeButton from "../components/hover-size-button";
import type { Page } from "../utils/parseImageConfig";
import HoverImgButton from "../components/hover-img-button";
import ArtGallery from "../components/art-gallery";

export default function DesktopDigital({ onNavigate }: { onNavigate: (screen: Page) => void; }) {
    const [subfolder, setSubfolder] = useState<string | undefined>(undefined);

    return (
        <div className="flex justify-between w-full h-full overflow-hidden">
            <div className="flex-1 min-w-0 h-full p-4">
                <ArtGallery folder="digital-art" subfolder={subfolder} />
            </div>
            <div>
                <HoverImgButton
                    img={homeImg}
                    hoverImg={homeGif}
                    imgConfig={homeCss}
                    onClick={() => onNavigate("home")}
                />
            </div>

            <div>
                <HoverSizeButton
                    img={animationImg}
                    subImg={animationText}
                    imgConfig={animationCss}
                    subImgConfig={animationTextCss}
                    onClick={() => setSubfolder("animation")}
                />
                <HoverSizeButton
                    img={digitalArtImg}
                    subImg={digitalArtText}
                    imgConfig={digitalArtCss}
                    subImgConfig={digitalArtTextCss}
                    onClick={() => setSubfolder("digital-art")}
                />
                <HoverSizeButton
                    img={otherImg}
                    subImg={otherText}
                    imgConfig={otherCss}
                    subImgConfig={otherTextCss}
                    onClick={() => setSubfolder("other")}
                />
                <HoverSizeButton
                    img={photographyImg}
                    subImg={photographyText}
                    imgConfig={photographyCss}
                    subImgConfig={photographyTextCss}
                    onClick={() => setSubfolder("photography")}
                />

            </div>
        </div>
    );
}
