import { CONTACT_ACTIONS } from "./data";
import Icon from "./icon";

/** The fixed XP taskbar the "Contacting Remyz13" box was restyled into.
    Carries `main`'s typography itself so it can be mounted anywhere. */
export default function Taskbar() {
    return (
        <div className="fixed bottom-0 left-0 z-10 m-0 flex w-full border-0 p-0 font-xp text-[80%] bg-[image:var(--xp-taskbar)]">
            <div className="mr-[0.5em] flex items-center rounded-tr-[40px] rounded-br-[50px] bg-[image:var(--xp-start)] bg-cover bg-center bg-no-repeat px-[7px] py-[2px] text-white [filter:drop-shadow(0_0_7px_#000)] shadow-[-2px_-2px_10px_rgba(0,0,0,0.25)_inset,2px_2px_10px_rgba(0,0,0,0.5)_inset]">
                <h4 className="m-0 inline-block pr-[1.2rem] [font-family:sans-serif] text-[1.4rem] font-bold italic whitespace-nowrap [text-shadow:2px_2px_5px_#0007]">
                    💬 start
                </h4>
            </div>

            <div className="m-0 flex items-center overflow-y-scroll text-[0.875em] font-bold">
                {CONTACT_ACTIONS.map((action) => (
                    <a
                        key={action.label}
                        href={action.href}
                        rel={action.nofollow ? "nofollow" : undefined}
                        className="ml-[0.3em] rounded-[3px] border border-[#003c74] bg-[image:var(--xp-button)] p-[0.5em] font-normal whitespace-nowrap text-white hover:bg-[image:var(--xp-button-hover)] hover:no-underline"
                    >
                        <Icon src={action.icon} />{" "}
                        {action.label}
                    </a>
                ))}
            </div>
        </div>
    );
}
