import { NavLink } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">
        <span className="nav-logo-mark">◈</span>
        <span>Luminary</span>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/donate" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Donate
        </NavLink>
      </div>
    </nav>
  )
}
