export default function Footer() {
  return (
    <footer className="footer">
      <a href="/"><span className="footer-logo">◈ Annoying Link</span></a>
      <h4 className="footer-copy">
        © {new Date().getFullYear()} · Information and Trust
      </h4>
      <center><iframe
        src="https://ghbtns.com/github-btn.html?user=paydaypay1&repo=annoying-link&type=sponsor&size=large&text=false"
        frameBorder="0"
        scrolling="0"
        width="200"
        height="75"
        title="Sponsor on GitHub"
      ></iframe></center>
      <a href="/donate" className="footer-cta btn-outline">
        Donate →
      </a>
    </footer>
  );
}
