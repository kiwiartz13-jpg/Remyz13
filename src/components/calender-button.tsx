import { useRef, useState } from "react";

import forward from "../assets/calender-button/forwards.webm"
import reversed from "../assets/calender-button/reversed.webm"

import calenderStart from "../assets/calender-button/start.png"
import calenderEnd from "../assets/calender-button/end.png"

import one from "../assets/calender-button/1-selected.png"
import two from "../assets/calender-button/2-selected.png"
import three from "../assets/calender-button/3-selected.png"
import four from "../assets/calender-button/4-selected.png"

type State = "start" | "opening" | "closing" | "end" |
    "one" | "two" | "three" | "four"

export type YearFilter = number | number[]

type CalenderButtonProps = {
    filter: (years: YearFilter | undefined) => void;
    filters: [YearFilter, YearFilter, YearFilter, YearFilter];
}

export default function CalenderButton({ filter, filters }: CalenderButtonProps) {
    const [phase, setPhase] = useState<State>("start");
    const forwardsVid = useRef<HTMLVideoElement>(null);
    const reversedVid = useRef<HTMLVideoElement>(null);

    const open = phase === "end" || phase === "one" || phase === "two" || phase === "three" || phase === "four"
    const showButtons = open || phase === "opening"

    const handleClick = () => {
        if (phase === "start") {
            setPhase("opening")
            forwardsVid.current?.play();
        }
        if (open) {
            setPhase("closing")
            reversedVid.current?.play();
            filter(undefined);
        }
    };

    const select = (next: State, years: YearFilter) => {
        setPhase(next);
        filter(years);
    };

    return (
        <div
            className="border-0 p-0 relative h-30 w-40 z-40 hover:scale-104"
        >
            <video
                ref={forwardsVid}
                src={forward}
                muted
                playsInline
                preload="auto"
                onEnded={() => setPhase((p) => p === "opening" ? "end" : p)}
                className={`absolute top-0 left-0 ${phase === "opening" ? "opacity-100" : "opacity-0"} `}
            />
            <video
                ref={reversedVid}
                src={reversed}
                muted
                playsInline
                preload="auto"
                onEnded={() => setPhase((p) => p === "closing" ? "start" : p)}
                className={`absolute top-0 left-0 ${phase === "closing" ? "opacity-100" : "opacity-0"} `}
            />
            <img
                src={calenderStart}
                className={`absolute top-0 left-0 ${phase === "start" ? "opacity-100" : "opacity-0"} `}
            />
            <img
                src={calenderEnd}
                className={`absolute top-0 left-0 ${phase === "end" ? "opacity-100" : "opacity-0"} `}
            />
            <img
                src={one}
                className={`absolute top-0 left-0 ${phase === "one" ? "opacity-100" : "opacity-0"}  `}
            />
            <img
                src={two}
                className={`absolute top-0 left-0 ${phase === "two" ? "opacity-100 cursor-pointer" : "opacity-0"} `}
            />
            <img
                src={three}
                className={`absolute top-0 left-0 ${phase === "three" ? "opacity-100 cursor-pointer" : "opacity-0"} `}
            />
            <img
                src={four}
                className={`absolute top-0 left-0 ${phase === "four" ? "opacity-100 cursor-pointer" : "opacity-0"} `}
            />
            <button className="absolute top-0 left-0 w-full h-28 cursor-pointer" onClick={handleClick} >
                
            </button>
            {showButtons && (
                <>
                    <button className="absolute top-28 left-0 w-full h-8 cursor-pointer" onClick={() => select("one", filters[0])}>

                    </button>
                    <button className="absolute top-36 left-0 w-full h-8 cursor-pointer" onClick={() => select("two", filters[1])}>

                    </button>
                    <button className="absolute top-44 left-0 w-full h-8 cursor-pointer" onClick={() => select("three", filters[2])}>

                    </button>
                    <button className="absolute top-52 left-0 w-full h-8 cursor-pointer" onClick={() => select("four", filters[3])}>

                    </button>
                </>
            )}
        </div>
    );
}
