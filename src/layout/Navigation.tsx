import { useState } from 'react'

export default function Navigation() {
  const [darkMode, setDarkMode] = useState(true)
  const [extraAnimations, setExtraAnimations] = useState(false)
  const [soundEffects, setSoundEffects] = useState(false)
  
  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }
  const toggleExtraAnimation= () => {
    setExtraAnimations(!extraAnimations)
  }
  const toggleSoundEffects= () => {
    setSoundEffects(!soundEffects)
  }
  
  return(
    <div className="navigation">
      <h3>Navigation</h3>
      <br/>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/features">Features</a></li>
        <li><a href="/features/webdj" target="_blank">  →Web DJ</a></li>
        <li><a href="/features/spheregrid" target="_blank">  →Sphere Grid</a></li>
        <li><a href="/features/browserlab" target="_blank">  →Browser Lab</a></li>
        <li><a href="https://github.com/paydaypay1/annoying-link">GitHub</a></li>
        <li><a href="/donate">Donate</a></li>
      </ul>
      {/*<br/><br/><br/><br/>
      <hr/>
      <br/>
      <h3>Settings</h3>
      <br/>
      <div className="settings-content">
        <label htmlFor="theme-setting">Dark Theme     </label>
        <input type="checkbox" id="theme-setting" name="theme" checked={darkMode} onChange={toggleTheme}/>
        <br/>
        <label htmlFor="animation-setting">Extra Animations  </label>
        <input type="checkbox" id="animation-setting" name="animations" checked={extraAnimations} onChange={toggleExtraAnimation}/>
        <br/>
        <label htmlFor="sound-effect-setting">Sound Effects        </label>
        <input type="checkbox" id="sound-effect-setting" name="soundEffects" checked={soundEffects} onChange={toggleSoundEffects}/>
      </div>*/}
    </div>
  )
}
