import onlineIcon from "../../assets/about-me/icons/green_person.svg";
import profilePic from "../../assets/about-me/pfp.svg";

export default function ProfileCard() {
    return (
        <>
            <span itemProp="name">
                <h1 className="m-0 rounded-t-[5px] border-2 border-[#1b44b8] bg-[image:var(--xp-title-bar)] bg-cover bg-center bg-no-repeat p-[0.5em] text-[1.5em] font-bold text-white [text-shadow:2px_2px_0_#000]">
                    Remyz13
                </h1>
            </span>

            <div className="border-x-2 border-b-2 border-[#1b44b8] bg-white p-[1em] shadow-[5px_8px_10px_#0006]">
                <div className="xp-cd relative float-left mr-[1em] block h-[160px] w-[183px] [filter:drop-shadow(0_0_0.25rem_gray)]">
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
