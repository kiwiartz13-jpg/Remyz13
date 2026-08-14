import XpWindow from "../xp-window";
import murdoc from "../../../assets/about-me/murdoctv.svg"

export default function ShrugPanel({
    title
}: {
    title: string;
}) {
    return (
        <XpWindow frame="section" titlePad="lg" title={title} className="my-[10px] w-full">
            <div className="w-full bg-[#e7e4cf]">
                <table className="w-full border-separate border-spacing-[2px] p-[7px]">
                    <tbody className="">
                        <a href="https://kongstudios.gorillaz.com/" target="_blank" rel="noopener noreferrer">
                            <img className="hover:scale-101 mb-0.5 cursor-pointer" src={murdoc}/>
                        </a>
                        <span className="text-[10px]">Thank you to </span>
                        <a href="https://github.com/EthanMik" target="_blank" className="text-[10px] hover:underline hover:text-[#1D4ED8]">EthanMik</a>
                        <span className="text-[10px]"> for coding help & keeping me locked in</span>
                    </tbody>
                </table>
            </div>
        </XpWindow>
    );
}
