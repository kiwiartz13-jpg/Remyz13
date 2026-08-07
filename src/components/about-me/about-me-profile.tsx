import type { Page } from "../../utils/parseImageConfig";
import "./about-me.css";

import { INTERESTS } from "./data";
import InterestsPanel from "./interests-panel";
import ProfileCard, { MoodLinks } from "./profile-card";
import ProfileNav from "./profile-nav";
import { BlurbsPanel, ClickMePanel, FriendCommentsPanel, FriendSpacePanel, NotepadPanel } from "./right-column";
import Taskbar from "./taskbar";
import XpWindow from "./xp-window";

export default function AboutMeProfile({ onNavigate }: { onNavigate: (screen: Page) => void; }) {
    return (
        <div className="about-me font-spacehey text-[16px] leading-[1.225]">
            <div className="mx-auto mb-[10px] w-[810px] max-w-full">
                <ProfileNav onNavigate={onNavigate} />

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
                            <InterestsPanel title="¯\_(ツ)_/¯" rows={[]} stackBody />
                        </div>

                        <div className="p-[10px] xs:table-cell xs:align-top">
                            <ClickMePanel />
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
            </div>

            <Taskbar />
        </div>
    );
}
