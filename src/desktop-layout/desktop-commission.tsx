import { MenuButton, type Button } from "../components/top-menu";
import type { Page } from "../utils/parseImageConfig";

import homeButtonImg from "../assets/homepage-menu-buttons/logo.png";
import homeButtonGif from "../assets/homepage-menu-buttons/logo.gif";

import banner from "../assets/commission-assets/banner.png";
import moreInfo from "../assets/commission-assets/more-info.jpeg";
import commissionSheet from "../assets/commission-assets/commission-sheet.png";
import title from "../assets/commission-assets/artwork-title.png";
import ArtGallery from "../components/art-gallery";
import prices from "../prices.json";

function Header({ button } : {button: Button}) {
    return (
        <div className="flex justify-between items-center w-full pl-5 pt-2 ">
            <div className="flex flex-row gap-15">
                <MenuButton {...button} />
            </div>
            <div className="flex justify-center w-full">
                <img src={banner} style={{ height: 175}}/>
            </div>
        </div>
    );
}

export default function DesktopCommission({ onNavigate }: { onNavigate: (screen: Page) => void; }) {
    const homeButton: Button = {
        onClick: () => onNavigate("home"),
        img: homeButtonImg,
        hoverImg: homeButtonGif,
    }

    const pricePositions: Record<string, Record<string, { top: number; left: number }>> = {
        headshot: {
            sketch:  { top: 26.8, left: 28.2 },
            lineart: { top: 30.6, left: 28.2 },
            render:  { top: 34.8, left: 28.2 },
        },
        halfbody: {
            sketch:  { top: 47.3, left: 27.5 },
            lineart: { top: 51.4, left: 27.5 },
            render:  { top: 55.8, left: 27.5 },
        },
        fullbody: {
            sketch:  { top: 70.3, left: 27.7 },
            lineart: { top: 73.7, left: 27.7 },
            render:  { top: 77.3, left: 27.8 },
        },
    };

    return (
        <div className="flex flex-col overflow-y-auto h-full">
            <Header button={homeButton}/>
            <div className="flex flex-row gap-6 ml-10 mr-10 mt-3 items-start">
                <div className="relative" style={{ flex: "1087 1 0", containerType: "inline-size" }}>

                    <img className="w-full h-auto block" src={commissionSheet} />

                    {Object.entries(prices).map(([category, tiers]) =>
                        Object.entries(tiers).map(([tier, price]) => {
                            const pos = pricePositions[category]?.[tier];
                            if (!pos) return null;
                            return (
                                <div
                                    key={`${category}-${tier}`}
                                    className="absolute text-[#DB4F9F]  font-bold -translate-x-1/2 -translate-y-1/2"
                                    style={{ top: `${pos.top}%`, left: `${pos.left}%`, fontSize: "2cqw", fontFamily: "'Patrick Hand'" }}
                                >
                                    ${price}
                                </div>
                            );
                        })
                    )}
                </div>
                <img className="w-full h-auto block" style={{ flex: "700 1 0" }} src={moreInfo} />
            </div>

            <div className="pb-3 flex pt-6 pl-10 pr-10">
                <img className="w-full" src={title}/>
                <div className="w-800 h-auto"></div>
            </div>

            <div className="flex-1 p-10 pb-10">
                <ArtGallery folder={"commission-art"} columns={4}/>
            </div>
        </div>
    )
    
}