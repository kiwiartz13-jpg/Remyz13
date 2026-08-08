import { Fragment, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { BLURBS, COMMENTS, FRIENDS, SCALE } from "./data";
import { VerifiedIcon } from "./icon";
import piano from "../../assets/about-me/piano.svg"
import XpWindow from "./xp-window";

const PANEL_INNER = "p-[7px]";
const LINK = "text-[#1E40AF] no-underline";

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

export function ClickMePanel() {
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
        className="cursor-pointer border-0 bg-transparent p-0"
      >
        <img src={piano} alt="" className="block max-w-none active:scale-95 transition-transform duration-100" />
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
            className="animate-note-float pointer-events-none fixed z-[60] -mt-[38px] -ml-[32px] w-[64px] text-center font-xp text-[#222222] select-none"
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

export function NotepadPanel() {
  return (
    <XpWindow
      frame="panel"
      titlePad="sm"
      icon="📝"
      title="Notepad"
      asHeading={false}
      className="mt-[1em]"
    >
      <h4 className="mt-[1em] mr-0 mb-[1.33em] ml-[1em] font-notepad font-bold">
        Remyz13's Latest Blog Entries
      </h4>
      <p className="mt-[1em] mr-0 mb-[1em] ml-[1em] font-notepad text-[12px]">
        <i>There are no Blog Entries yet.</i>
      </p>
    </XpWindow>
  );
}

export function BlurbsPanel() {
  return (
    <XpWindow
      frame="panel"
      icon="💻"
      title="Blurbs"
      className="mt-[1em] mb-[20px]"
    >
      <div className={PANEL_INNER}>
        {BLURBS.map((blurb) => (
          <div key={blurb.heading} className="mb-[14px]">
            <h4 className="m-0 mb-[5px] font-bold text-[#dd1974]">
              {blurb.heading}
            </h4>
            <p itemProp={blurb.itemProp} className="m-0 mb-[8px] text-[12px]">
              {blurb.body}
            </p>
          </div>
        ))}
      </div>
    </XpWindow>
  );
}

export function FriendSpacePanel() {
  return (
    <XpWindow frame="panel" title="Friend Space" className="mt-[1em]">
      <div className={PANEL_INNER}>
        <p className="m-0 mb-[8px] text-[12px]" />
        <div>
          {FRIENDS.map((friend) => (
            <Fragment key={friend.name}>
              <div className="inline-block w-[105px] pr-[10px] pb-[15px]">
                <a href={friend.href} className={LINK}>
                  <p className="m-0 mb-[8px] w-full text-center text-[100%] font-bold wrap-break-word text-[#666666]">
                    {friend.name}{" "}
                    <VerifiedIcon reason={friend.verifiedReason} />
                  </p>
                </a>
                <a href={friend.href} className={LINK}>
                  <img
                    src={friend.pfp}
                    alt={friend.alt}
                    loading="lazy"
                    className="mx-auto block max-h-[95px] max-w-[95px]"
                  />
                </a>
              </div>{" "}
            </Fragment>
          ))}
        </div>
      </div>
    </XpWindow>
  );
}

export function FriendCommentsPanel() {
  return (
    <XpWindow frame="panel" title="Friend Comments" className="mt-[1em]">
      <div className={PANEL_INNER}>
        <table className="block h-[300px] w-full border-separate border-spacing-[2px] overflow-y-scroll bg-[#e7e4cf] wrap-break-word">
          <tbody>
            {COMMENTS.map((comment) => (
              <tr key={comment.commentHref}>
                <td className="w-[38%] border-r border-b border-r-[#bebbaa] border-b-[#bebbaa] bg-[#f8f6f0] text-center align-top font-bold">
                  <a href={comment.profileHref} className={LINK}>
                    <p className="m-0 mb-[8px] max-w-full text-[100%]">
                      {comment.author}
                    </p>
                  </a>
                  <a href={comment.profileHref} className={LINK}>
                    <img
                      src={comment.pfp}
                      alt={comment.alt}
                      loading="lazy"
                      className="inline max-h-[200px] w-[90px] max-w-full align-baseline"
                    />
                  </a>
                </td>
                <td className="bg-white align-top">
                  <p className="m-0 mb-[8px] max-w-full text-[100%]">
                    <b>
                      <a
                        href={comment.commentHref}
                        className="text-inherit no-underline"
                      >
                        <time className="opacity-100">{comment.ago}</time>
                      </a>
                    </b>
                  </p>
                  <p className="m-0 mb-[8px] max-w-full text-[100%]">
                    {comment.body}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </XpWindow>
  );
}
