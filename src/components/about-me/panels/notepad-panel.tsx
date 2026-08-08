import XpWindow from "../xp-window";

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
      <h4 className="mt-[1em] mr-0 mb-[1.33em] ml-[1em] font-notepad font-bold">
        UNDER CONSTRUCTION
      </h4>
      <p className="mt-[1em] mr-0 mb-[1em] ml-[1em] font-notepad text-[12px]">
        <i>buh boom</i>
      </p>
    </XpWindow>
  );
}
