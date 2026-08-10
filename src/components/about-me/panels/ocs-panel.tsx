import XpWindow from "../xp-window";

import about from "../../../assets/about-me/about-button.png"
import music from "../../../assets/about-me/music-button.png"
import ocs from "../../../assets/about-me/ocs-button.png"
import wips from "../../../assets/about-me/wips-button.png"

function Tile({ src } : { src: string }) {
  return (
    <img className="hover:scale-102 cursor-pointer active:scale-99 " src={src}/>
  )
}

export default function NotepadPanel() {
  return (
    <XpWindow
      frame="panel"
      titlePad="sm"
      icon="🎨"
      title="OCs"
      asHeading={false}
      className="mt-[1em]"
    >
      <div className="grid grid-cols-2 p-1">
          <Tile src={ocs}/>
          <Tile src={about}/>
          <Tile src={wips}/>
          <Tile src={music}/>
      </div>
    </XpWindow>
  );
}
