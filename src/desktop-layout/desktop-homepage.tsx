
import aboutMeStill from "../assets/homepage-menu-buttons/about-me-still.png";
import aboutMeGif from "../assets/homepage-menu-buttons/about-me.gif";
import aboutMeText from "../assets/homepage-menu-buttons/about-me-text.png";
import digitalStill from "../assets/homepage-menu-buttons/digital-still.png";
import digitalGif from "../assets/homepage-menu-buttons/digital.gif";
import digitalText from "../assets/homepage-menu-buttons/digital-text.png";
import logoGif from "../assets/homepage-menu-buttons/logo.gif";
import shopStill from "../assets/homepage-menu-buttons/shop-still.png";
import shopGif from "../assets/homepage-menu-buttons/shop.gif";
import shopText from "../assets/homepage-menu-buttons/shop-text.png";
import socialMediaStill from "../assets/homepage-menu-buttons/social-media-still.png";
import socialMediaGif from "../assets/homepage-menu-buttons/social-media.gif";
import socialMediaText from "../assets/homepage-menu-buttons/social-media-text.png";
import traditionalStill from "../assets/homepage-menu-buttons/traditional-still.png";
import traditionalGif from "../assets/homepage-menu-buttons/traditional.gif";
import traditionalText from "../assets/homepage-menu-buttons/traditional-text.png";

import aboutMeCss from "../css/desktop-homepage-css/about-me.txt?raw";
import aboutMeTextCss from "../css/desktop-homepage-css/about-me-text.txt?raw";
import digitalCss from "../css/desktop-homepage-css/digital.txt?raw";
import digitalTextCss from "../css/desktop-homepage-css/digital-text.txt?raw";
import logoCss from "../css/desktop-homepage-css/logo.txt?raw";
import shopCss from "../css/desktop-homepage-css/shop.txt?raw";
import shopTextCss from "../css/desktop-homepage-css/shop-text.txt?raw";
import socialMediaCss from "../css/desktop-homepage-css/social-media.txt?raw";
import socialMediaTextCss from "../css/desktop-homepage-css/social-media-text.txt?raw";
import traditionalCss from "../css/desktop-homepage-css/traditional.txt?raw";
import traditionalTextCss from "../css/desktop-homepage-css/traditional-text.txt?raw";

import HoverImgButton from "../components/hover-img-button";
import type { Page } from "../utils/parseImageConfig";

export default function DesktopHomepage({ onNavigate }: { onNavigate: (page: Page) => void }) {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <HoverImgButton
                img={aboutMeStill}
                subImg={aboutMeText}
                hoverImg={aboutMeGif}
                imgConfig={aboutMeCss}
                subImgConfig={aboutMeTextCss}
                onClick={() => {}}
            />
            <HoverImgButton
                img={digitalStill}
                subImg={digitalText}
                hoverImg={digitalGif}
                imgConfig={digitalCss}
                subImgConfig={digitalTextCss}
                onClick={() => onNavigate("digital")}
            />
            <HoverImgButton
                img={logoGif}
                imgConfig={logoCss}
                onClick={() => {}}
                scale={false}
            />
            <HoverImgButton
                img={shopStill}
                subImg={shopText}
                hoverImg={shopGif}
                imgConfig={shopCss}
                subImgConfig={shopTextCss}
                onClick={() => {}}
            />
            <HoverImgButton
                img={socialMediaStill}
                subImg={socialMediaText}
                hoverImg={socialMediaGif}
                imgConfig={socialMediaCss}
                subImgConfig={socialMediaTextCss}
                onClick={() => {}}
            />
            <HoverImgButton
                img={traditionalStill}
                subImg={traditionalText}
                hoverImg={traditionalGif}
                imgConfig={traditionalCss}
                subImgConfig={traditionalTextCss}
                onClick={() => onNavigate("traditional")}
            />
        </div>
    );
}
