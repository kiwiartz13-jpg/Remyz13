import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { SCALE } from "../data";
import piano from "../../../assets/about-me/piano.svg"

type FloatingNote = {
  id: number;
  scaleIndex: number;
  beamed: boolean;
  x: number;
  y: number;
  dx: number;
  dy: number;
  duration: number;
};

function NoteGlyph({ stem, beamed }: { stem: "up" | "down"; beamed: boolean }) {
  const up = stem === "up";
  const [cx, cy] = up ? [8, 31] : [16, 9];

  if (beamed) {
    return up ? (
      <svg viewBox="0 0 42 40" aria-hidden="true" className="mx-auto block h-[34px] w-[39px] fill-current">
        <ellipse cx="8" cy="31" rx="7" ry="5" transform="rotate(-20 8 31)" />
        <ellipse cx="26" cy="31" rx="7" ry="5" transform="rotate(-20 26 31)" />
        <rect x="12.6" y="4" width="2.2" height="26" />
        <rect x="30.6" y="4" width="2.2" height="26" />
        <rect x="12.6" y="4" width="20.2" height="4.5" />
      </svg>
    ) : (
      <svg viewBox="0 0 42 40" aria-hidden="true" className="mx-auto block h-[34px] w-[39px] fill-current">
        <ellipse cx="16" cy="9" rx="7" ry="5" transform="rotate(-20 16 9)" />
        <ellipse cx="34" cy="9" rx="7" ry="5" transform="rotate(-20 34 9)" />
        <rect x="9.2" y="10" width="2.2" height="26" />
        <rect x="27.2" y="10" width="2.2" height="26" />
        <rect x="9.2" y="31.5" width="20.2" height="4.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 40" aria-hidden="true" className="mx-auto block h-[34px] w-[22px] fill-current">
      <ellipse cx={cx} cy={cy} rx="7" ry="5" transform={`rotate(-20 ${cx} ${cy})`} />
      <rect x={up ? 12.6 : 9.2} y={up ? 4 : 10} width="2.2" height="26" />
    </svg>
  );
}

export default function PianoPanel() {
  const [notes, setNotes] = useState<FloatingNote[]>([]);
  const clicks = useRef(0);
  const lastClick = useRef(0);
  const audioCtx = useRef<AudioContext | null>(null);

  function playTone(freq: number) {
    const ctx = (audioCtx.current ??= new AudioContext());
    void ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.35);
  }

  function spawnNote(event: MouseEvent<HTMLButtonElement>) {
    const id = clicks.current++;
    const scaleIndex = id % SCALE.length;
    playTone(SCALE[scaleIndex].freq);

    const now = event.timeStamp;
    const beam = now - lastClick.current < 300;
    lastClick.current = beam ? 0 : now;

    const note: FloatingNote = {
      id,
      scaleIndex,
      beamed: false,
      x: event.clientX,
      y: event.clientY,
      dx: 60 + Math.random() * 240,
      dy: -(event.clientY + 120),
      duration: 2.6 + Math.random() * 1.8,
    };

    setNotes((prev) => {
      const last = prev.at(-1);
      if (beam && last && !last.beamed) {
        return [...prev.slice(0, -1), { ...last, beamed: true }];
      }
      return [...prev.slice(-(24 - 1)), note];
    });
  }

  return (
    <div className="
      mb-[10px] flex items-center justify-center border-0 bg-[#e7e5cf] p-[10px]
      shadow-[2px_2px_0_#ffffff_inset,-2px_-2px_0_#5d5c51_inset,5px_8px_10px_#0006]
      ">
      <button
        type="button"
        onClick={spawnNote}
        aria-label="Play the next note of the scale"
        className="cursor-pointer border-0 bg-transparent p-0 hover:scale-y-102 hover:scale-x-101"
      >
        <img src={piano} alt="" className="block active:scale-95 transition-transform duration-100" />
      </button>

      {createPortal(
        notes.map(({ id, scaleIndex, beamed, x, y, dx, dy, duration }) => (
          <div
            key={id}
            onAnimationEnd={(e) => {
              if (e.currentTarget === e.target) setNotes((prev) => prev.filter((n) => n.id !== id));
            }}
            style={{
              left: x,
              top: y,
              "--note-dx": `${dx}px`,
              "--note-dy": `${dy}px`,
              "--note-duration": `${duration}s`,
            } as CSSProperties}
            className="animate-note-float pointer-events-none fixed z-[60] -mt-[38px] -ml-[32px] w-[64px] text-center font-xp text-[#000000] select-none"
          >
            <div className="animate-note-sway">
              <NoteGlyph stem={SCALE[scaleIndex].stem} beamed={beamed} />
            </div>
          </div>
        )),
        document.body,
      )}
    </div>
  );
}
