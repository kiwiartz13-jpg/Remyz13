import tickIcon from "../../assets/about-me/icons/tick_light_blue.png";

/** SpaceHey's inline `.icon` sprite: 1.4em square, nudged onto the text baseline. */
export default function Icon({ src, className = "" }: { src: string; className?: string }) {
    return (
        <img
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={`inline-block aspect-square h-[1.4em] w-[1.4em] my-0 mr-[0.05em] ml-[0.1em] align-[-0.3em] text-transparent ${className}`}
        />
    );
}

/** The blue verification tick, which renders smaller and closer to the name. */
export function VerifiedIcon({ reason }: { reason: string }) {
    return (
        <span className="verified-info cursor-pointer" title="Verified User" data-reason={reason}>
            <img
                src={tickIcon}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="inline-block aspect-square h-[0.9em] w-[0.9em] mr-[0.02em] ml-0 align-[-0.06em] text-transparent [filter:drop-shadow(0_0_2px_rgba(67,131,184,0.2))]"
            />
        </span>
    );
}
