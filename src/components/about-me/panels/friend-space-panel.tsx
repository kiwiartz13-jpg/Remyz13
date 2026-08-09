import { Fragment, useEffect, useRef, useState } from "react";
import { playSound } from "../../../utils/sound";
import { FRIENDS, type Friend } from "../data";
import { VerifiedIcon } from "../icon";
import XpWindow from "../xp-window";

const pickSfx = (sfx: string[]) => sfx[Math.floor(Math.random() * sfx.length)];

export default function FriendSpacePanel() {
  const [talking, setTalking] = useState<string | null>(null);
  const clip = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    for (const friend of FRIENDS) new Image().src = friend.pfpAlt;
    return () => clip.current?.pause();
  }, []);

  function greet(friend: Friend) {
    clip.current?.pause();
    const audio = playSound(pickSfx(friend.sfx));
    clip.current = audio;
    const stop = () => clip.current === audio && setTalking(null);
    audio.addEventListener("ended", stop);
    audio.addEventListener("error", stop);
    setTalking(friend.name);
  }

  return (
    <XpWindow frame="panel" title="Friend Space" className="mt-[1em]">
      <div className="p-[7px]">
        <p className="m-0 mb-[8px] text-[12px]" />
        <div>
          {FRIENDS.map((friend) => (
            <Fragment key={friend.name}>
              <div className="inline-block w-[105px] pr-[10px] pb-[15px]">
                  <p className="m-0 mb-[8px] w-full text-center text-[100%] font-bold wrap-break-word text-[#666666]">
                    {friend.name}{" "}
                    <VerifiedIcon reason={friend.verifiedReason} />
                  </p>
                  <button
                    type="button"
                    onClick={() => greet(friend)}
                    aria-label={`Play ${friend.name}'s sound`}
                    className="group mx-auto block cursor-pointer border-0 bg-transparent p-0"
                  >
                    <span
                      className={`block origin-bottom`}
                    >
                      <img
                        src={talking === friend.name ? friend.pfpAlt : friend.pfp}
                        alt={friend.alt}
                        loading="lazy"
                        className="mx-auto block max-h-[95px] max-w-[95px] transition-transform duration-75 group-hover:scale-102"
                      />
                    </span>
                  </button>
              </div>{" "}
            </Fragment>
          ))}
        </div>
      </div>
    </XpWindow>
  );
}
