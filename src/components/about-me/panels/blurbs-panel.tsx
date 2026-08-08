import { BLURBS } from "../data";
import XpWindow from "../xp-window";

export default function BlurbsPanel() {
  return (
    <XpWindow
      frame="panel"
      icon="💻"
      title="Blurbs"
      className="mt-[1em] mb-[20px]"
    >
      <div className="p-[7px]">
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
