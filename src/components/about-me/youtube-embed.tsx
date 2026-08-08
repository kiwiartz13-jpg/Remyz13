import { useEffect, useState } from "react";
import kaboom from "../../assets/about-me/kaboom.mp3";
import { playSound } from "../../utils/sound";
import { XP_TITLE_BAR } from "./xp-window";

export type NavVideo = { href: string; label: string };

export function YoutubeEmbed({ video, onClose }: { video: NavVideo; onClose: () => void; }) {
  const id = video.href.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)?.[1] ?? null;
  const [title, setTitle] = useState(video.label);

  useEffect(() => {
    const abort = new AbortController();
    fetch(`https://www.youtube.com/oembed?url=https://youtu.be/${id}&format=json`, { signal: abort.signal })
      .then((res) => res.json())
      .then((data: { title: string }) => setTitle(data.title))
      .catch(() => {});
    return () => abort.abort();
  }, [id]);

  return (
    <div className="relative m-[1em] text-[12px] text-white shadow-[5px_8px_10px_#0006]">
      <span className={`${XP_TITLE_BAR} p-[1em]`}>
        <span className="mr-5">NOW PLAYING  </span>{title}
      </span>

      <span
        onClick={() => { playSound(kaboom); onClose(); }}
        className="cursor-pointer absolute top-0 right-0 mt-[0.5em] mr-[0.5em] inline-block w-fit rounded-[5px] border border-white bg-[image:var(--xp-close)] px-[0.6em] py-[0.4em]"
      >
        X
      </span>

      <div className="bg-[#1D4ED8] p-[10px] border-x-2 border-b-2 border-[#1d43d1]">
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="block aspect-video w-full border-0"
        />
      </div>
    </div>
  );
}
