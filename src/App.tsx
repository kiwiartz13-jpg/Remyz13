import { useState, useEffect } from 'react'
import './App.css'
import DesktopHomepage from './desktop-layout/desktop-homepage'
import DesktopDigital from './desktop-layout/desktop-digital'
import wallpaper from './assets/wallpaper.png'
import type { Page } from './utils/parseImageConfig'

export default function App() {
  const [scale, setScale] = useState(1);
  const [screen, setScreen] = useState<Page>("home");

  useEffect(() => {
    const update = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A355E', backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {screen === 'home' && (
        <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'center', flexShrink: 0 }}>
          <DesktopHomepage onNavigate={setScreen} />
        </div>
      )}
      {screen === 'digital' && (
        <div style={{ width: '100%', height: '100%' }}>
          <DesktopDigital onNavigate={setScreen} />
        </div>
      )}
    </div>
  )
}
