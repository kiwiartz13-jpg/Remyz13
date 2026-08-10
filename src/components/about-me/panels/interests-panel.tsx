import type { InterestRow } from "../data";
import XpWindow from "../xp-window";

export default function InterestsPanel({
    title,
    rows,
    stackBody = false,
}: {
    title: string;
    rows: InterestRow[];
    stackBody?: boolean;
}) {
    return (
        <XpWindow frame="section" titlePad="lg" title={title} className="my-[10px] w-full">
            <div className="w-full bg-[#e7e4cf]">
                <table className="w-full border-separate border-spacing-[2px]">
                    <tbody className={stackBody ? "flex flex-col" : undefined}>
                        {rows.map((row) => (
                            <tr key={row.label} className="flex flex-col">
                                <td className="w-full bg-[#e7e4cf] align-top">
                                    <p className="m-0 mb-[3px] border-b-2 border-[#e7e4cf] [border-bottom-style:ridge] px-[0.3em] pt-[0.3em] text-[12px] leading-[initial] font-bold wrap-break-word text-[#1D4ED8]">
                                        {row.label}
                                    </p>
                                </td>
                                <td className="w-full bg-[#e7e4cf] align-top">
                                    <p className="m-0 mb-[3px] p-[0.3em] text-[12px] leading-[initial] wrap-break-word">{row.value}</p>
                                    <img className="pl-3 pr-3 mt-2 mb-2" src={row.src} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </XpWindow>
    );
}
