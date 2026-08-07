import homeGif from "../assets/homepage-menu-buttons/logo.gif";
import homeImg from "../assets/homepage-menu-buttons/logo.png";

import type { Page } from "../utils/parseImageConfig";
import { MenuButton } from "../components/top-menu";
import AboutMeProfile from "../components/about-me/about-me-profile";

export default function AboutMe({ onNavigate }: { onNavigate: (screen: Page) => void; }) {

    const homeButton = {
        img: homeImg,
        hoverImg: homeGif,
        onClick: () => onNavigate('home'),
        w: "clamp(80px, 8vw, 200px)",
        h: "clamp(80px, 8vw, 200px)"
    }

    // leading-[1.225] matches SpaceHey's `html` line-height, which used to leak
    // app-wide and set the home button's baseline spacing on this page.
    return (
        <div className="flex flex-col w-full h-full overflow-y-auto leading-[1.225]">
            <div className="static min-[1056px]:absolute self-start pl-5 pt-2">
                <MenuButton {...homeButton} />
            </div>
            <AboutMeProfile onNavigate={onNavigate}/>
        </div>
    );
}
