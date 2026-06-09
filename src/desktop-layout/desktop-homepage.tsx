import HoverButton from "../components/hover-button";

import aboutMeStill from "../assets/menu-buttons/about-me-still.png";
import aboutMeGif from "../assets/menu-buttons/about-me.gif";
import aboutMeText from "../assets/menu-buttons/about-me-text.png";
import digitalStill from "../assets/menu-buttons/digital-still.png";
import digitalGif from "../assets/menu-buttons/digital.gif";
import digitalText from "../assets/menu-buttons/digital-text.png";
import logoStill from "../assets/menu-buttons/logo-still.png.png";
import logoGif from "../assets/menu-buttons/logo.gif";
import shopStill from "../assets/menu-buttons/shop-still.png.png";
import shopGif from "../assets/menu-buttons/shop.gif";
import shopText from "../assets/menu-buttons/shop-text.png";
import socialMediaStill from "../assets/menu-buttons/social-media-still.png";
import socialMediaGif from "../assets/menu-buttons/social-media.gif";
import socialMediaText from "../assets/menu-buttons/social-media-text.png";
import traditionalStill from "../assets/menu-buttons/traditional-still.png";
import traditionalGif from "../assets/menu-buttons/traditional.gif";
import traditionalText from "../assets/menu-buttons/traditional-text.png";

import aboutMeCss from "../assets/desktop-css/about-me.txt?raw";
import aboutMeTextCss from "../assets/desktop-css/about-me-text.txt?raw";
import digitalCss from "../assets/desktop-css/digital.txt?raw";
import digitalTextCss from "../assets/desktop-css/digital-text.txt?raw";
import logoCss from "../assets/desktop-css/logo.txt?raw";
import shopCss from "../assets/desktop-css/shop.txt?raw";
import shopTextCss from "../assets/desktop-css/shop-text.txt?raw";
import socialMediaCss from "../assets/desktop-css/social-media.txt?raw";
import socialMediaTextCss from "../assets/desktop-css/social-media-text.txt?raw";
import traditionalCss from "../assets/desktop-css/traditional.txt?raw";
import traditionalTextCss from "../assets/desktop-css/traditional-text.txt?raw";

import wallpaper from "../assets/wallpaper.png"

export default function DesktopHomepage() {
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#1A355E]"
          style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <HoverButton
                img={aboutMeStill}
                subImg={aboutMeText}
                hoverImg={aboutMeGif}
                imgConfig={aboutMeCss}
                subImgConfig={aboutMeTextCss}
                onClick={() => {}}
            />
            <HoverButton
                img={digitalStill}
                subImg={digitalText}
                hoverImg={digitalGif}
                imgConfig={digitalCss}
                subImgConfig={digitalTextCss}
                onClick={() => {}}
            />
            <HoverButton
                img={logoStill}
                hoverImg={logoGif}
                imgConfig={logoCss}
                onClick={() => {}}
            />
            <HoverButton
                img={shopStill}
                subImg={shopText}
                hoverImg={shopGif}
                imgConfig={shopCss}
                subImgConfig={shopTextCss}
                onClick={() => {}}
            />
            <HoverButton
                img={socialMediaStill}
                subImg={socialMediaText}
                hoverImg={socialMediaGif}
                imgConfig={socialMediaCss}
                subImgConfig={socialMediaTextCss}
                onClick={() => {}}
            />
            <HoverButton
                img={traditionalStill}
                subImg={traditionalText}
                hoverImg={traditionalGif}
                imgConfig={traditionalCss}
                subImgConfig={traditionalTextCss}
                onClick={() => {}}
            />
        </div>
    );
}
