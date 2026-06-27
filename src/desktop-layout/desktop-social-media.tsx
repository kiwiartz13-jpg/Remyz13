import homeGif from "../assets/homepage-menu-buttons/logo.gif";
import homeImg from "../assets/homepage-menu-buttons/logo.png";

import artfight from "../assets/social-media/artfight-icon.png"
import insta from "../assets/social-media/instagram-icon.png"
import pintrest from "../assets/social-media/pintrest-icon.png"
import toyhouse from "../assets/social-media/toyhouse-icon.png"
import youtube from "../assets/social-media/youtube-icon.png"

import type { Page } from "../utils/parseImageConfig";
import { MenuButton } from "../components/top-menu";

type SocialMediaButtonProps = {
    icon: string,
    text: string,
    url: string,
    hoverColor: string
}

function SocialMediaButton({
    icon, text, hoverColor, url 
}: SocialMediaButtonProps) {
    return (
        <button
            onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
            className="relative w-full items-center flex cursor-pointer bg-[rgba(22,31,67,.75)] hover:bg-(--hover-color) hover:scale-103 transition-colors duration-300 ease-in-out"
            style={{ "--hover-color": hoverColor, height: "clamp(60px, 9.5vw, 152px)" } as React.CSSProperties}
        >
            <div className="absolute left-0 flex justify-start" style={{ width: "clamp(80px, 10vw, 160px)" }}>
                <img className="w-full h-auto block" src={icon}/>
            </div>

            <div className="w-full flex justify-center">
                <span className="text-white" style={{
                    fontFamily: "'Patrick Hand SC'",
                    fontSize: "clamp(28px, 3.33vw, 64px)"
                }}>
                    {text}
                </span>
            </div>
        </button>
    )
}

export default function DesktopSocialMedia({ onNavigate }: { onNavigate: (screen: Page) => void; }) {

    const homeButton = {
        img: homeImg,
        hoverImg: homeGif,
        onClick: () => onNavigate('home'),
        w: "clamp(80px, 10.4vw, 200px)",
        h: "clamp(80px, 10.4vw, 200px)"
    }

    return (
        <div className="flex flex-col w-full h-full overflow-y-auto">
            <div className="absolute pl-5 pt-2">
                <MenuButton {...homeButton} />
            </div>
            <div className="flex pt-7 flex-col gap-7" style={{ paddingLeft: "clamp(20px, 20.8vw, 400px)", paddingRight: "clamp(20px, 20.8vw, 400px)" }}>
                <SocialMediaButton icon={insta} text={"Instagram"} hoverColor="#99b11f" url={"https://www.instagram.com/remyz13"}/>
                <SocialMediaButton icon={youtube} text={"YouTube"} hoverColor="#00A56A" url={"https://www.youtube.com/@remyz13"}/>
                <SocialMediaButton icon={artfight} text={"ArtFight"} hoverColor="#087791" url={"https://artfight.net/~%D0%AFemy"}/>
                <SocialMediaButton icon={pintrest} text={"Pinterest"} hoverColor="#B50D66" url={"https://www.pinterest.com/remyz13/"}/>
                <SocialMediaButton icon={toyhouse} text={"ToyHouse"} hoverColor="#D94A7E" url={"https://toyhou.se/remyz13"}/>
            </div>
        </div>
    );
}
