import { useState } from 'react'

export default function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen)
    document.head.style.setProperty = `display: ${settingsOpen ? 'block' : 'none'};`
  }

  return (
    <div className="header">
      <a href="/"><h2>Annoying Link</h2></a>
      <button onClick={toggleSettings}>
        Menu
      </button>
    </div>
  )
}
