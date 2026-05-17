import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen)
  }
    
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">
        <span className="nav-logo-mark">◈</span>
        <span>Annoying Link</span>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/features" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Features
        </NavLink>
        <NavLink to="#" onClick={toggleSettings} className={settingsOpen ? 'nav-link active' : 'nav-link'}>
          Menu
        </NavLink>
      </div>
    </nav>
  )
}
