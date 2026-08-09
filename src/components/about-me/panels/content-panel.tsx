import { useEffect, useState } from "react";
import kaboom from "../../../assets/about-me/kaboom.mp3";
import { playSound } from "../../../utils/sound";
import { XP_TITLE_BAR } from "../xp-window";

export type NavContent = { href: string; label: string };

const YOUTUBE_ID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/;

function toUrl(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    return new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }
}

export default function ContentPanel({ content, onClose }: { content: NavContent; onClose: () => void; }) {
  const [fetched, setFetched] = useState<{ id: string; title: string } | null>(null);

  const url = toUrl(content.href);
  const videoId = url?.href.match(YOUTUBE_ID)?.[1] ?? null;
  const site = url ? url.hostname.replace(/^www\./, "") : "";
  const src = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url?.href;

  useEffect(() => {
    if (!videoId) return;
    const abort = new AbortController();
    fetch(`https://www.youtube.com/oembed?url=https://youtu.be/${videoId}&format=json`, { signal: abort.signal })
      .then((res) => res.json())
      .then((data: { title: string }) => setFetched({ id: videoId, title: data.title }))
      .catch(() => {});
    return () => abort.abort();
  }, [videoId]);

  const title = (fetched?.id === videoId ? fetched.title : null) || site || content.label;

  return (
    <div className="relative m-[1em] text-[12px] text-white shadow-[5px_8px_10px_#0006]">
      <span className={`${XP_TITLE_BAR} block truncate p-[1em] pr-[6em]`}>
        <span className="mr-5">{videoId ? "NOW PLAYING" : "NOW BROWSING"}</span>
        {title}
      </span>

      <span className="absolute top-0 right-0 mt-[0.5em] mr-[0.5em] flex gap-[0.4em]">
        {src && (
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            title="Open in a new tab"
            className="cursor-pointer inline-block w-fit rounded-[5px] border border-white bg-[image:var(--xp-button)] px-[0.6em] py-[0.4em] text-inherit no-underline"
          >
            Go
          </a>
        )}
        <span
          onClick={() => { playSound(kaboom); onClose(); }}
          className="cursor-pointer inline-block w-fit rounded-[5px] border border-white bg-[image:var(--xp-close)] px-[0.6em] py-[0.4em]"
        >
          X
        </span>
      </span>

      <div className="bg-[#1D4ED8] p-[10px] border-x-2 border-b-2 border-[#1d43d1]">
        {src ? (
          <iframe
            key={src}
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={`block w-full border-0 ${videoId ? "aspect-video" : "h-[70vh]"}`}
          />
        ) : (
          <p className="m-0 py-[2em] text-center">that's not a link 🫩</p>
        )}
      </div>
    </div>
  );
}
