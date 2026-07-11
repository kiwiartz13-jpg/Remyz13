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
            className="border-0 p-0 relative z-40 hover:scale-104"
            style={{ width: 160, minWidth: 0, aspectRatio: "4 / 3" }}
        >
            <video
                ref={forwardsVid}
                src={forward}
                muted
                playsInline
                preload="auto"
                onEnded={() => setPhase((p) => p === "opening" ? "end" : p)}
                className={`absolute top-0 left-0 w-full h-auto ${phase === "opening" ? "opacity-100" : "opacity-0"} `}
            />
            <video
                ref={reversedVid}
                src={reversed}
                muted
                playsInline
                preload="auto"
                onEnded={() => setPhase((p) => p === "closing" ? "start" : p)}
                className={`absolute top-0 left-0 w-full h-auto ${phase === "closing" ? "opacity-100" : "opacity-0"} `}
            />
            <img
                src={calenderStart}
                className={`absolute top-0 left-0 w-full h-auto ${phase === "start" ? "opacity-100" : "opacity-0"} `}
            />
            <img
                src={calenderEnd}
                className={`absolute top-0 left-0 w-full h-auto ${phase === "end" ? "opacity-100" : "opacity-0"} `}
            />
            <img
                src={one}
                className={`absolute top-0 left-0 w-full h-auto ${phase === "one" ? "opacity-100" : "opacity-0"}  `}
            />
            <img
                src={two}
                className={`absolute top-0 left-0 w-full h-auto ${phase === "two" ? "opacity-100 cursor-pointer" : "opacity-0"} `}
            />
            <img
                src={three}
                className={`absolute top-0 left-0 w-full h-auto ${phase === "three" ? "opacity-100 cursor-pointer" : "opacity-0"} `}
            />
            <img
                src={four}
                className={`absolute top-0 left-0 w-full h-auto ${phase === "four" ? "opacity-100 cursor-pointer" : "opacity-0"} `}
            />
            <button className="absolute top-0 left-0 w-full cursor-pointer" style={{ aspectRatio: "10 / 7" }} onClick={handleClick} >

            </button>
            {showButtons && (
                <div className="absolute left-0 w-full" style={{ top: "93.33%" }}>
                    <button
                        className="block w-full cursor-pointer"
                        style={{ aspectRatio: "5 / 1" }}
                        onClick={() => select("one", filters[0])}
                    >

                    </button>
                    <button
                        className="block w-full cursor-pointer"
                        style={{ aspectRatio: "5 / 1" }}
                        onClick={() => select("two", filters[1])}
                    >

                    </button>
                    <button
                        className="block w-full cursor-pointer"
                        style={{ aspectRatio: "5 / 1" }}
                        onClick={() => select("three", filters[2])}
                    >

                    </button>
                    <button
                        className="block w-full cursor-pointer"
                        style={{ aspectRatio: "5 / 1" }}
                        onClick={() => select("four", filters[3])}
                    >

                    </button>
                </div>
            )}
        </div>
    );
}
