import "./Settings.css"

export default function Settings() {
  return(
    <div className="settings" style={{position: "fixed", width: "250px", height: "100%", left: 0}}>
      <h1>Preferences</h1>
      <div className="settings-content">
        <label htmlFor="theme-setting">Theme</label>
        <select id="theme-setting" name="theme">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>

        <label htmlFor="animation-setting">Extra Animations</label>
        <select id="animation-setting" name="animations">
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>

        <label htmlFor="sound-effect-setting">Sound Effects</label>
        <select id="sound-effect-setting" name="soundEffects">
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
      </div>
    </div>
  )
}