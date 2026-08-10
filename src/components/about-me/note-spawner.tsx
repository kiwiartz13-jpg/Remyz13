import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import type { Instrument, ScaleNote } from "./data";
import { playSound } from "../../utils/sound";

type FloatingNote = {
  id: number;
  stem: "up" | "down";
  beamed: boolean;
  x: number;
  y: number;
  dx: number;
  dy: number;
  duration: number;
};

const MAX_NOTES = 24;

let audioCtx: AudioContext | null = null;

function playNote(note: ScaleNote, { wave = "triangle", decay = 1.3, peak = 0.16 }: Instrument) {
  if (note.sample) return void playSound(note.sample);
  if (!note.freq) return;

  const ctx = (audioCtx ??= new AudioContext());
  void ctx.resume();

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = wave;
  osc.frequency.value = note.freq;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(peak, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + decay + 0.05);
}

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

/** Walks `instrument` one note per click and floats a matching glyph off the top of the page. */
function useNoteSpawner(instrument: Instrument) {
  const [notes, setNotes] = useState<FloatingNote[]>([]);
  const clicks = useRef(0);
  const lastClick = useRef(0);

  function spawnNote(event: MouseEvent<HTMLElement>) {
    const id = clicks.current++;
    const step = instrument.notes[id % instrument.notes.length];
    playNote(step, instrument);

    const now = event.timeStamp;
    const beam = now - lastClick.current < 300;
    lastClick.current = beam ? 0 : now;

    const note: FloatingNote = {
      id,
      stem: step.stem,
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
      return [...prev.slice(-(MAX_NOTES - 1)), note];
    });
  }

  const overlay = createPortal(
    notes.map(({ id, stem, beamed, x, y, dx, dy, duration }) => (
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
          <NoteGlyph stem={stem} beamed={beamed} />
        </div>
      </div>
    )),
    document.body,
  );

  return { spawnNote, overlay };
}

export default function NoteButton({
  src,
  instrument,
  label,
  imgClassName = "",
}: {
  src: string;
  instrument: Instrument;
  label: string;
  imgClassName?: string;
}) {
  const { spawnNote, overlay } = useNoteSpawner(instrument);

  return (
    <>
      <button
        type="button"
        onClick={spawnNote}
        aria-label={label}
        className="cursor-pointer border-0 bg-transparent p-0 hover:scale-y-102 hover:scale-x-101"
      >
        <img src={src} alt="" className={`block transition-transform duration-100 active:scale-95 ${imgClassName}`} />
      </button>
      {overlay}
    </>
  );
}
