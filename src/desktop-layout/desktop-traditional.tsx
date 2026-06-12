import clayImg from "../assets/traditional-menu-buttons/clay.png";
import mixedMediaImg from "../assets/traditional-menu-buttons/mixed-media.png";
import otherImg from "../assets/traditional-menu-buttons/other.png";
import paintImg from "../assets/traditional-menu-buttons/paint.png";
import sketchImg from "../assets/traditional-menu-buttons/sketch.png";
import homeGif from "../assets/homepage-menu-buttons/logo.gif";
import homeImg from "../assets/homepage-menu-buttons/logo.png";

import { useRef, useState } from "react";

import type { Page } from "../utils/parseImageConfig";
import ArtGallery from "../components/art-gallery";
import { TopMenu } from "../components/top-menu";

export default function DesktopTraditional({ onNavigate }: { onNavigate: (screen: Page) => void; }) {
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
                        img: paintImg,
                        onClick: () => setSubfolder('paint'),
                        onRelease: () => setSubfolder(undefined)
                    },
                    {
                        img: sketchImg,
                        onClick: () => setSubfolder('sketch'),
                        onRelease: () => setSubfolder(undefined)
                    },
                    {
                        img: clayImg,
                        onClick: () => setSubfolder('clay'),
                        onRelease: () => setSubfolder(undefined)
                    },
                    {
                        img: mixedMediaImg,
                        onClick: () => setSubfolder('mixed-media'),
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
                <ArtGallery folder="traditional-art" subfolder={subfolder} />
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
