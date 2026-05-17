export default function Navigation() {
  return(
    <div className="navigation" style={{position: "fixed", width: "200px", height: "100vh", left: 0}}>
      <h3>Navigation</h3>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/features">Features</a></li>
        <li><a href="/features/webdj">• Web DJ</a></li>
        <li><a href="/features/browserlab">• Browser Lab</a></li>
        <li><a href="/features">Donate</a></li>
      </ul>
      <br/><br/><br/>
      <hr/>
      <br/><br/>
      <h3>Settings</h3>
      <div className="settings-content">
        <label htmlFor="theme-setting">Theme</label>
        <select id="theme-setting" name="theme">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <br/>
        <label htmlFor="animation-setting">Extra Animations</label>
        <select id="animation-setting" name="animations">
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
        <br/>
        <label htmlFor="sound-effect-setting">Sound Effects</label>
        <select id="sound-effect-setting" name="soundEffects">
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
      </div>
    </div>
  )
}