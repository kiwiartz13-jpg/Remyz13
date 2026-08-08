import { useRef, useState, type CSSProperties } from "react";
import cd from "../../../assets/about-me/cd.png";
import cdShine from "../../../assets/about-me/cd-shine.png";
import cdPlayer from "../../../assets/about-me/cdplayer.jpg";
import music from "../../../assets/about-me/music.mp3";
import onlineIcon from "../../../assets/about-me/icons/green_person.svg";
import profilePic from "../../../assets/about-me/pfp.svg";
import Notification from "../notification";

export default function ProfileCard() {
    const audio = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [plays, setPlays] = useState(0);

    function toggle() {
        const el = audio.current;
        if (!el) return;

        if (playing) {
            el.pause();
            el.currentTime = 0;
            setPlaying(false);
            return;
        }

        void el.play().catch(() => {});
        setPlaying(true);
        setPlays((n) => n + 1);
    }

    return (
        <>
            <audio ref={audio} src={music} onEnded={() => setPlaying(false)} />

            {plays > 0 && (
                <Notification key={plays} duration={.1}>
                    <img src={cdPlayer} alt="" className="block w-[320px] max-w-[90vw] border-2 border-[#1b44b8] shadow-[0_5px_10px_#0006]" />
                </Notification>
            )}

            <span itemProp="name">
                <h1 className="m-0 rounded-t-[5px] border-2 border-[#1b44b8] bg-[image:var(--xp-title-bar)] bg-cover bg-center bg-no-repeat p-[0.5em] text-[1.5em] font-bold text-white [text-shadow:2px_2px_0_#000]">
                    Remyz13
                </h1>
            </span>

            <div className="border-x-2 border-b-2 border-[#1b44b8] bg-white p-[1em] shadow-[5px_8px_10px_#0006]">
                <div
                    onClick={toggle}
                    style={{ "--cd": `url(${cd})`, "--cd-shine": `url(${cdShine})` } as CSSProperties}
                    className={`relative float-left mr-[1em] block h-[160px] w-[183px] cursor-pointer [filter:drop-shadow(0_0_0.25rem_gray)]
                        before:absolute before:top-[5px] before:z-[-1] before:h-[150px] before:w-[150px] before:bg-[image:var(--cd)] before:bg-no-repeat before:transition-[left] before:duration-500 before:ease-[ease] before:content-['']
                        after:absolute after:inset-0 after:bg-[image:var(--cd-shine),var(--xp-cd-shine)] after:bg-[length:contain,cover] after:content-['']
                        ${playing ? "before:left-[-75px] before:animate-spin-cd" : "before:left-[-20px] hover:before:left-[-35px]"}`}
                >
                    <img
                        src={profilePic}
                        alt="Remyz13's profile picture"
                        className="float-right h-[160px] max-h-[160px] w-[163px] border-none"
                    />
                </div>

                <div className="block">
                    <p className="my-[10px] text-[95%] font-bold text-[#0C8C00]">
                        <img
                            src={onlineIcon}
                            aria-hidden="true"
                            alt="Online icon"
                            loading="lazy"
                            className="mr-[5px] h-[1.5em]"
                        />{" "}
                        ONLINE! (terminally)
                    </p>
                    <p className="my-[10px] text-[12px]">&lt;- cool art</p>
                </div>
            </div>
        </>
    );
}

export function MoodLinks() {
    return (
        <>
            <p className="mt-[1em] mr-0 mb-[8px] ml-[1em] text-[12px]">
                <b>Mood:</b> <span>awrsome saurce 😆</span>
            </p>
            <p className="mt-[1em] mr-0 mb-[8px] ml-[1em] text-[12px]">
                <b>
                    View my: <a href="" className="text-[#1E40AF] no-underline">Blog</a> |{" "}
                    <a href="" className="text-[#1E40AF] no-underline">Bulletins</a> |{" "}
                    <a href="" className="text-[#1E40AF] no-underline">Forum Topics</a>
                </b>
            </p>
        </>
    );
}
