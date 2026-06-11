import animationImg from "../assets/digital-menu-buttons/animation.png";
import digitalArtImg from "../assets/digital-menu-buttons/digital-art.png";
import otherImg from "../assets/digital-menu-buttons/other.png";
import photographyImg from "../assets/digital-menu-buttons/photography.png";
import homeGif from "../assets/homepage-menu-buttons/logo.gif";
import homeImg from "../assets/homepage-menu-buttons/logo.png";

import { useRef, useState } from "react";

import type { Page } from "../utils/parseImageConfig";
import ArtGallery from "../components/art-gallery";
import { TopMenu } from "../components/top-menu";

export default function DesktopDigital({ onNavigate }: { onNavigate: (screen: Page) => void; }) {
    const [subfolder, setSubfolder] = useState<string | undefined>(undefined);
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={scrollRef} className="flex flex-col w-full h-full overflow-y-auto">
            <TopMenu
                homeButton={{
                    img: homeImg,
                    hoverImg: homeGif,
                    onClick: () => onNavigate('home')
                }}
                menuButtons={[
                    {
                        img: animationImg,
                        onClick: () => setSubfolder('animation'),
                        onRelease: () => setSubfolder(undefined)
                    },
                    {
                        img: digitalArtImg,
                        onClick: () => setSubfolder('digital-art'),
                        onRelease: () => setSubfolder(undefined)
                    },
                    {
                        img: photographyImg,
                        onClick: () => setSubfolder('photography'),
                        onRelease: () => setSubfolder(undefined)
                    },
                    {
                        img: otherImg,
                        onClick: () => setSubfolder('other'),
                        onRelease: () => setSubfolder(undefined)
                    },
                ]}

            />

            <div className="flex-1 p-4 pb-6">
                <ArtGallery folder="digital-art" subfolder={subfolder} />
            </div>
            
            <div className="flex justify-center pb-8">
                <button
                    onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                    className="border-0 bg-transparent p-0 cursor-pointer"
                >
                    <img src={homeImg} className="w-43 h-auto hover:scale-103" />
                </button>
            </div>

        </div>
    );
}
