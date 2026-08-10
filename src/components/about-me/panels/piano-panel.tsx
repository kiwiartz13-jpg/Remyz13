import { PIANO } from "../data";
import NoteButton from "../note-spawner";
import piano from "../../../assets/about-me/piano.svg"

export default function PianoPanel() {
  return (
    <div className="
      mb-[10px] flex items-center justify-center border-0 bg-[#e7e5cf] p-[10px]
      shadow-[2px_2px_0_#ffffff_inset,-2px_-2px_0_#5d5c51_inset,5px_8px_10px_#0006]
      ">
      <NoteButton src={piano} instrument={PIANO} label="Play the next note of the scale" />
    </div>
  );
}
