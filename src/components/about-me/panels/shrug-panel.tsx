import XpWindow from "../xp-window";
import murdoc from "../../../assets/about-me/murdoctv.svg"

export default function ShrugPanel({
    title,
}: {
    title: string;
}) {
    return (
        <XpWindow frame="section" titlePad="lg" title={title} className="my-[10px] w-full">
            <div className="w-full bg-[#e7e4cf]">
                <table className="w-full border-separate border-spacing-[2px] p-[3px]">
                    <tbody className="">
                        <img src={murdoc}/>
                        <span className="text-[10px]">Thank you to </span>
                        <a href="https://github.com/EthanMik" target="_blank" className="text-[10px] hover:underline hover:text-[#1D4ED8]">EthanMik</a>
                        <span className="text-[10px]"> for coding help & keeping me locked in</span>
                    </tbody>
                </table>
            </div>
        </XpWindow>
    );
}
