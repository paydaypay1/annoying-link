import { useState } from 'react'
import Navigation from './Navigation'

export default function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen)
  }

  return (
    <div>
    <div className="header">
      <a href="/"><h2 className="logo">◈ Annoying Link</h2></a>
      <button className="btn menu-toggle" onClick={toggleSettings}>
        Menu
      </button>
    </div>
    { settingsOpen && (
      <div className={`fade-wrapper ${settingsOpen ? 'fade-in' : ''}`}>
        <Navigation/>
      </div>
    )}
    </div>
  )
}
