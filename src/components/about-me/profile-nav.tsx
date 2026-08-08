import { Fragment, useRef, useState, type SubmitEvent } from "react";
import navLogo from "../../assets/about-me/aphextwin.svg";
import erro from "../../assets/about-me/erro.mp3";
import help from "../../assets/about-me/help.mp3";
import kaboom from "../../assets/about-me/kaboom.mp3";
import { NAV_LINKS } from "./data";
import { XP_TITLE_BAR } from "./xp-window";
import type { Page } from "../../utils/parseImageConfig";
import { playSound } from "../../utils/sound";
import { type NavVideo } from "./youtube-embed";

export default function ProfileNav({ onNavigate, onPlayVideo }: { onNavigate: (screen: Page) => void; onPlayVideo: (video: NavVideo) => void; }) {
  const [ open, setOpen ] = useState(true);
  const query = useRef<HTMLInputElement>(null);

  function onSearch(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.current?.value.trim()) return;
    playSound(erro);
    e.currentTarget.reset();
  }

  return (
    <>
      { open &&
        <nav className="relative m-[1em] text-[12px] text-white shadow-[5px_8px_10px_#0006]">
          <div className={`${XP_TITLE_BAR} p-[1em]`}>
            UNDER CONSTRUCTION ABOUT ME
          </div>
    
          <span onClick={() => { playSound(kaboom); setOpen(false); }} className="cursor-pointer absolute top-0 right-0 mt-[0.5em] mr-[0.5em] inline-block w-fit rounded-[5px] border border-white bg-[image:var(--xp-close)] px-[0.6em] py-[0.4em]">
            X
          </span>
    
          <div
            className={`relative flex bg-[#1D4ED8] px-[10px] pt-[15px] pb-[14px] border-x-2 border-[#1d43d1] max-xs:block max-xxs:pt-[8px]`}
          >
            <div className="align-top max-xs:mb-[10px] max-xs:w-full">
                <img
                  src={navLogo}
                  alt="SpaceHey"
                  fetchPriority="high"
                  className="inline ml-[6px] h-[42px] w-[42px] align-baseline max-xxs:ml-0 max-xxs:h-[25.2px] max-xxs:w-[99px]"
                />
            </div>
    
            <div className="flex-1 text-center max-xs:w-full">
              <form
                onSubmit={onSearch}
                role="search"
                className="-mt-[2px] w-full max-xs:flex"
              >
                <label htmlFor="q">Search Users:</label>{" "}
                <div className="inline-block align-top max-xs:flex-1">
                  <input
                    id="q"
                    ref={query}
                    type="text"
                    name="q"
                    autoComplete="off"
                    className="[all:revert] m-0 font-[inherit] text-[100%] leading-[1.15] max-xs:w-[calc(100%-10px)] max-xs:max-w-full"
                  />
                </div>{" "}
                <button className="[all:revert] m-0 cursor-pointer font-[inherit] text-[100%] leading-[1.15]" type="submit">Search</button>
              </form>
            </div>
    
            <div className="text-right max-xs:absolute max-xs:top-[8px] max-xs:right-[8px]">
              <a
                rel="help"
                onClick={() => playSound(help)}
                className="text-inherit no-underline hover:underline cursor-pointer"
              >
                Help
              </a>{" "}
              |{" "}
              <a onClick={() => {onNavigate('home')}} className="text-inherit no-underline hover:underline cursor-pointer">
                LogOut
              </a>
            </div>
          </div>
    
          <ul
            className={`m-0 list-none bg-[#60A5FA] px-[16px] py-[3.5px] border-b-2 border-x-2 border-[#1d43d1] max-xs:px-[3.5px] max-xs:pt-[3.5px] max-xs:pb-[5.5px] max-xs:text-center max-xxs:flex max-xxs:gap-[5px] max-xxs:overflow-x-auto max-xxs:pl-[8px]`}
          >
            {NAV_LINKS.map((link) => {
              return (
              <Fragment key={link.label}>
                <li className="inline-block min-h-[1.4em] not-last:after:text-black not-last:after:content-['_|_'] max-xxs:not-last:after:[display:ruby]">
                  <a
                    target="_blank"
                    href={link.href}
                    onClick={(e) => {
                      if (link.navigateTo) onNavigate(link.navigateTo);
                        if (!link.hyperlink) {
                          e.preventDefault();
                          onPlayVideo({ href: link.href ?? "", label: link.label });
                        }
                    }}
                    className="text-[12px] cursor-pointer text-white no-underline [text-shadow:0_0_7px_#095DC3] hover:text-[#040c5c] hover:underline"
                  >
                    {link.label}
                  </a>
                </li>{" "}
              </Fragment>
              );
            })}
          </ul>
        </nav>
      }
    </>
  );
}
