import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'

// autoUpdate mode reloads the page on its own once a new service worker
// activates; the browser only looks for one on page load, so re-check
// whenever we come back online, regain focus, or hourly while open.
registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return
    const checkForUpdates = () => {
      if (navigator.onLine) registration.update().catch(() => {})
    }
    window.addEventListener('online', checkForUpdates)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkForUpdates()
    })
    setInterval(checkForUpdates, 60 * 60 * 1000)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
