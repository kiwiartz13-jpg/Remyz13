import { Fragment, useState } from "react";
import navLogo from "../../assets/about-me/aphextwin.svg";
import { NAV_LINKS } from "./data";
import { XP_TITLE_BAR } from "./xp-window";
import type { Page } from "../../utils/parseImageConfig";

const NAV_BORDER = "border-x-2 border-[#1d43d1]";

export default function ProfileNav({ onNavigate }: { onNavigate: (screen: Page) => void; }) {
  const [ open, setOpen ] = useState(true);
  return (
    <>
      { open &&
        <nav className="relative m-[1em] text-[12px] text-white shadow-[5px_8px_10px_#0006]">
          <div className={`${XP_TITLE_BAR} p-[1em]`}>
            UNDER CONSTRUCTION ABOUT ME
          </div>
    
          <span onClick={() => setOpen(false)} className="cursor-pointer absolute top-0 right-0 mt-[0.5em] mr-[0.5em] inline-block w-fit rounded-[5px] border border-white bg-[image:var(--xp-close)] px-[0.6em] py-[0.4em]">
            X
          </span>
    
          <div
            className={`relative flex bg-[#1D4ED8] px-[10px] pt-[15px] pb-[14px] ${NAV_BORDER} max-xs:block max-xxs:pt-[8px]`}
          >
            <div className="align-top max-xs:mb-[10px] max-xs:w-full">
              <a href="#" className="text-inherit no-underline hover:underline">
                <img
                  src={navLogo}
                  alt="SpaceHey"
                  fetchPriority="high"
                  className="ml-[6px] h-[42px] w-[42px] max-xxs:ml-0 max-xxs:h-[25.2px] max-xxs:w-[99px]"
                />
              </a>
            </div>
    
            <div className="flex-1 text-center max-xs:w-full">
              <form
                onSubmit={(e) => e.preventDefault()}
                role="search"
                className="-mt-[2px] w-full max-xs:flex"
              >
                {/* Spaces between these inline-blocks came from the original markup. */}
                <label htmlFor="q">Search Users:</label>{" "}
                <div className="inline-block align-top max-xs:flex-1">
                  <input
                    id="q"
                    type="text"
                    name="q"
                    autoComplete="off"
                    className="max-xs:w-[calc(100%-10px)] max-xs:max-w-full"
                  />
                </div>{" "}
                <button type="submit">Search</button>
              </form>
            </div>
    
            <div className="text-right max-xs:absolute max-xs:top-[8px] max-xs:right-[8px]">
              <a
                href="#"
                rel="help"
                className="text-inherit no-underline hover:underline"
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
            className={`m-0 list-none bg-[#60A5FA] px-[16px] py-[3.5px] border-b-2 ${NAV_BORDER} max-xs:px-[3.5px] max-xs:pt-[3.5px] max-xs:pb-[5.5px] max-xs:text-center max-xxs:flex max-xxs:gap-[5px] max-xxs:overflow-x-auto max-xxs:pl-[8px]`}
          >
            {/* The trailing space is load-bearing: these are inline-block, and the
                        original markup spaced them with a newline between each <li>. */}
            {NAV_LINKS.map((link) => (
              <Fragment key={link.label}>
                <li className="inline-block min-h-[1.4em] not-last:after:text-black not-last:after:content-['_|_'] max-xxs:not-last:after:[display:ruby]">
                  <a
                    href={link.href}
                    title={link.title}
                    className="text-[12px] text-white no-underline [text-shadow:0_0_7px_#095DC3] hover:text-[#040c5c] hover:underline"
                  >
                    {link.label}
                  </a>
                </li>{" "}
              </Fragment>
            ))}
          </ul>
        </nav>
      }
    </>
  );
}
