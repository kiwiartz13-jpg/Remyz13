import { Fragment, useRef } from "react";
import kaboomSound from "../../assets/about-me/kaboom.mp3";
import { BLURBS, COMMENTS, FRIENDS } from "./data";
import { VerifiedIcon } from "./icon";
import piano from "../../assets/about-me/piano.svg"
import XpWindow from "./xp-window";

const PANEL_INNER = "p-[7px]";
const LINK = "text-[#1E40AF] no-underline";

export function ClickMePanel() {
  const audio = useRef<HTMLAudioElement>(null);

  return (
    <div className="
      mb-[10px] flex items-center justify-center border-0 bg-[#e7e5cf] p-[10px] 
      shadow-[2px_2px_0_#ffffff_inset,-2px_-2px_0_#5d5c51_inset,5px_8px_10px_#0006]
      ">
      <img src={piano} className="active:scale-95 transition-transform" />
      {/* <div className="text-center font-bold">
        <audio ref={audio} src={kaboomSound} preload="auto" />
        <h3 className="my-[1em] text-[1.17em] font-bold">
          <a
            href="#"
            className={LINK}
            onClick={(e) => {
              e.preventDefault();
              const el = audio.current;
              if (!el) return;
              el.currentTime = 0;
              void el.play();
            }}
          >
            click me &gt;.&lt;
          </a>
        </h3>
      </div> */}
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
            <h4 className="m-0 mb-[5px] font-bold text-[#ED0707]">
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
        {/* Trailing space is load-bearing, as with the nav links. */}
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
        <table className="xp-table block h-[300px] w-full overflow-y-scroll bg-[#e7e4cf] wrap-break-word">
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
                      className="max-h-[200px] w-[90px] max-w-full"
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
