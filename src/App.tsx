import { useState, useEffect } from 'react'
import './App.css'
import DesktopHomepage from './desktop-layout/desktop-homepage'
import DesktopDigital from './desktop-layout/desktop-digital'
import DesktopTraditional from './desktop-layout/desktop-traditional'
import wallpaper from './assets/wallpaper.png'
import type { Page } from './utils/parseImageConfig'
import DesktopCommission from './desktop-layout/desktop-commission'
import DesktopSocialMedia from './desktop-layout/desktop-social-media'
import DesktopAboutMe from './desktop-layout/desktop-about-me'

const HOME_CONTENT_W = 1350;
const HOME_CONTENT_H = 1005;

const PAGES: readonly Page[] = ["home", "digital", "traditional", "commission", "social-media", "about-me"];

const pathToPage = (pathname: string): Page => {
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  return (PAGES as readonly string[]).includes(slug) ? (slug as Page) : "home";
};

const pageToPath = (page: Page) => page === "home" ? "/" : `/${page}`;

export default function App() {
  const [scale, setScale] = useState(1);
  const [screen, setScreen] = useState<Page>(() => pathToPage(window.location.pathname));

  const navigate = (page: Page) => {
    if (page === screen) return;
    window.history.pushState(null, "", pageToPath(page));
    setScreen(page);
  };

  useEffect(() => {
    const onPopState = () => setScreen(pathToPage(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const update = () => setScale(Math.min(
      1,
      window.innerWidth / HOME_CONTENT_W,
      window.innerHeight / HOME_CONTENT_H,
    ));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A355E', backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {screen === 'home' && (
        <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'center', flexShrink: 0 }}>
          <DesktopHomepage onNavigate={navigate} />
        </div>
      )}
      {screen === 'digital' && (
        <div style={{ width: '100%', height: '100%' }}>
          <DesktopDigital onNavigate={navigate} />
        </div>
      )}
      {screen === 'traditional' && (
        <div style={{ width: '100%', height: '100%' }}>
          <DesktopTraditional onNavigate={navigate} />
        </div>
      )}
      {screen === 'commission' && (
        <div style={{ width: '100%', height: '100%' }}>
          <DesktopCommission onNavigate={navigate} />
        </div>
      )}
      {screen === 'social-media' && (
        <div style={{ width: '100%', height: '100%' }}>
          <DesktopSocialMedia onNavigate={navigate} />
        </div>
      )}
      {screen === 'about-me' && (
        <div style={{ width: '100%', height: '100%' }}>
          <DesktopAboutMe onNavigate={navigate} />
        </div>
      )}
    </div>
  )
}
