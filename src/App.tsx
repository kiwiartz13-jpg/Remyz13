import { useState, useEffect } from 'react'
import './App.css'
import Homepage from './layout/homepage'
import Digital from './layout/digital'
import Traditional from './layout/traditional'
import type { Page } from './utils/parseImageConfig'
import { wallpaperStyle } from './utils/wallpapers'
import Commission from './layout/commission'
import SocialMedia from './layout/social-media'
import AboutMe from './layout/about-me'

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
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', ...wallpaperStyle(screen) }}>
      {screen === 'home' && (
        <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'center', flexShrink: 0 }}>
          <Homepage onNavigate={navigate} />
        </div>
      )}
      {screen === 'digital' && (
        <div style={{ width: '100%', height: '100%' }}>
          <Digital onNavigate={navigate} />
        </div>
      )}
      {screen === 'traditional' && (
        <div style={{ width: '100%', height: '100%' }}>
          <Traditional onNavigate={navigate} />
        </div>
      )}
      {screen === 'commission' && (
        <div style={{ width: '100%', height: '100%' }}>
          <Commission onNavigate={navigate} />
        </div>
      )}
      {screen === 'social-media' && (
        <div style={{ width: '100%', height: '100%' }}>
          <SocialMedia onNavigate={navigate} />
        </div>
      )}
      {screen === 'about-me' && (
        <div style={{ width: '100%', height: '100%' }}>
          <AboutMe onNavigate={navigate} />
        </div>
      )}
    </div>
  )
}
