import { Fragment } from "react";
import { FRIENDS } from "../data";
import { VerifiedIcon } from "../icon";
import XpWindow from "../xp-window";

export default function FriendSpacePanel() {
  return (
    <XpWindow frame="panel" title="Friend Space" className="mt-[1em]">
      <div className="p-[7px]">
        <p className="m-0 mb-[8px] text-[12px]" />
        <div>
          {FRIENDS.map((friend) => (
            <Fragment key={friend.name}>
              <div className="inline-block w-[105px] pr-[10px] pb-[15px]">
                <a href={friend.href} className="text-[#1E40AF] no-underline">
                  <p className="m-0 mb-[8px] w-full text-center text-[100%] font-bold wrap-break-word text-[#666666]">
                    {friend.name}{" "}
                    <VerifiedIcon reason={friend.verifiedReason} />
                  </p>
                </a>
                <a href={friend.href} className="text-[#1E40AF] no-underline">
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
