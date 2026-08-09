import { useState } from "react";
import type { Page } from "../../utils/parseImageConfig";
import BlinkieRoller from "./blinkie-roller";
import DrawGif from "../../art/digital-art/animation/2026 - Drawing Forever.gif"
import StarePng from "../../assets/about-me/stare.png"
import ContentPanel, { type NavContent } from "./panels/content-panel";

import { INTERESTS } from "./data";
import InterestsPanel from "./panels/interests-panel";
import ProfileCard, { MoodLinks } from "./panels/profile-card";
import ProfileNav from "./panels/profile-nav";
import BlurbsPanel from "./panels/blurbs-panel";
import FriendCommentsPanel from "./panels/friend-comments-panel";
import FriendSpacePanel from "./panels/friend-space-panel";
import NotepadPanel from "./panels/notepad-panel";
import Taskbar from "./taskbar";
import XpWindow from "./xp-window";
import PianoPanel from "./panels/piano-panel";
import ShrugPanel from "./panels/shrug-panel";

export default function AboutMeProfile({ onNavigate }: { onNavigate: (screen: Page) => void; }) {
    const [content, setContent] = useState<NavContent | null>(null);
    const [staring, setStaring] = useState(false);

    return (
        <div className="font-spacehey text-[16px] leading-[1.225]">
            <div className="mx-auto mb-[10px] w-[810px] max-w-full">
                <ProfileNav onNavigate={onNavigate} onOpenLink={setContent} />
                {content && <ContentPanel key={content.href} content={content} onClose={() => setContent(null)} />}
                <BlinkieRoller />

                <main className="relative px-0 py-[6px] font-xp text-[80%] text-black">
                    <div className="xs:table xs:w-full xs:table-fixed" itemScope itemType="https://schema.org/Person">
                        <meta itemProp="url" content="" />
                        <meta itemProp="identifier" content="4544508" />

                        <div className="flex w-full flex-col p-[10px]">
                            <ProfileCard />

                            <XpWindow frame="mood" titlePad="sm" icon="🙂" title="Mood" asHeading={false} className="mt-[1em] w-full">
                                <MoodLinks />
                            </XpWindow>

                            <InterestsPanel title="Interests" rows={INTERESTS} />
                            <ShrugPanel title="¯\_(ツ)_/¯" />
                        </div>

                        <div className="p-[10px] xs:table-cell xs:align-top">
                            <PianoPanel />
                            <NotepadPanel />
                            <BlurbsPanel />
                            <FriendSpacePanel />
                            <FriendCommentsPanel />
                        </div>
                    </div>
                </main>

                <footer className="relative m-[1em] mb-[3rem] border-2 border-[#1d43d1] bg-[#e3e3e3] px-[5px] py-[10px] text-center text-[70%] shadow-[5px_8px_10px_#0006]">
                    © 2026 remyz13
                </footer>

                <img
                    className="absolute bottom-2.5 -right-22 w-70 z-50"
                    src={staring ? StarePng : DrawGif}
                    onPointerEnter={() => setStaring(true)}
                    onPointerLeave={() => setStaring(false)}
                />
            </div>

            <Taskbar />
        </div>
    );
}
