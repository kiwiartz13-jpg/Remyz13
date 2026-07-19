import { MenuButton, type Button } from "../components/top-menu";
import type { Page } from "../utils/parseImageConfig";

import homeButtonImg from "../assets/homepage-menu-buttons/logo.png";
import homeButtonGif from "../assets/homepage-menu-buttons/logo.gif";

import banner from "../assets/commission-assets/banner.png";
import moreInfo from "../assets/commission-assets/more-info.jpeg";
import commissionSheet from "../assets/commission-assets/commission-sheet.webp";
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
                <img src={banner} className="h-auto" style={{ maxWidth: "min(100%, 866px)" }}/>
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
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mx-4 md:mx-10 mt-3">
                <div className="relative w-full max-w-140 md:max-w-none md:flex-[1087_1_0]" style={{ containerType: "inline-size" }}>

                    <img className="w-full h-auto block" src={commissionSheet} />

                    {Object.entries(prices).map(([category, tiers]) =>
                        Object.entries(tiers).map(([tier, price]) => {
                            const pos = pricePositions[category]?.[tier];
                            if (!pos) return null;
                            return (
                                <div
                                    key={`${category}-${tier}`}
                                    className="absolute text-[#DB4F9F]  font-bold -translate-x-1/2 -translate-y-1/2"
                                    style={{ top: `${pos.top}%`, left: `${pos.left}%`, fontSize: "2cqw", fontFamily: "'Patrick Hand SC'" }}
                                >
                                    ${price}
                                </div>
                            );
                        })
                    )}
                </div>
                <img className="w-full h-auto block min-w-0 max-w-140 md:max-w-full md:flex-[700_1_0]" src={moreInfo} />
            </div>

            <div className="pb-3 flex pt-6 pl-4 pr-4 md:pl-10 md:pr-10">
                <img className="h-auto" style={{ width: "clamp(220px, 35%, 700px)" }} src={title}/>
            </div>

            <div className="flex-1 p-10 pb-10">
                <ArtGallery folder={"commission-art"} columns={4}/>
            </div>
        </div>
    )
    
}