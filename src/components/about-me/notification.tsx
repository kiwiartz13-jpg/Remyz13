import type { CSSProperties, ReactNode } from "react";

export default function Notification({
    children,
    duration = 4,
    onDone,
}: {
    children: ReactNode;
    /** Seconds for the whole drop → hold → retract cycle. */
    duration?: number;
    onDone?: () => void;
}) {
    return (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center">
            <div
                style={{ "--notify-duration": `${duration}s` } as CSSProperties}
                onAnimationEnd={(e) => { if (e.target === e.currentTarget) onDone?.(); }}
                className="animate-notify pointer-events-auto"
            >
                {children}
            </div>
        </div>
    );
}
