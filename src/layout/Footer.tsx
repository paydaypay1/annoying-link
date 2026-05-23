import PrivacyPolicy from "../components/PrivacyPolicy"
import {useState} from "react"

export default function Footer() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
    document.querySelector(".privacy-policy")?.classList.remove("is-hidden");
  }
  
  return (
    <div className="footer">
      <a href="/">
        <span className="footer-logo">◈ Annoying Link</span>
      </a>
      <span className="footer-copy">© {new Date().getFullYear()}</span>
      <button onClick={handleOpen}>Privacy Policy</button>
      <iframe
    src="https://ghbtns.com/github-btn.html?user=paydaypay1&repo=annoying-link&type=fork&size=medium&text=true"
        frameBorder="0"
        scrolling="0"
        width="175"
        height="50"
        title="Sponsor on GitHub"
      ></iframe>
      {open &&
        <PrivacyPolicy/>
      }
    </div>
  );
}
