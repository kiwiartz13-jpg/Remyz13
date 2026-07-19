import homeGif from "../assets/homepage-menu-buttons/logo.gif";
import homeImg from "../assets/homepage-menu-buttons/logo.png";

import aboutMeHtml from "./about-me-content.html?raw";

import type { Page } from "../utils/parseImageConfig";
import { MenuButton } from "../components/top-menu";

export default function DesktopAboutMe({ onNavigate }: { onNavigate: (screen: Page) => void; }) {

    const homeButton = {
        img: homeImg,
        hoverImg: homeGif,
        onClick: () => onNavigate('home'),
        w: "clamp(80px, 10.4vw, 200px)",
        h: "clamp(80px, 10.4vw, 200px)"
    }

    return (
        <div className="flex flex-col w-full h-full overflow-y-auto">
            <div className="static min-[1056px]:absolute self-start pl-5 pt-2">
                <MenuButton {...homeButton} />
            </div>

            <div className="flex flex-col p-5 w-400 justify-center self-center items-center">
                <img src="https://files.catbox.moe/e1k8s5.gif" className="h-30"/>

                <div className="[&_img]:inline-block" dangerouslySetInnerHTML={{ __html: aboutMeHtml }} />
            </div>
        </div>
    );
}
