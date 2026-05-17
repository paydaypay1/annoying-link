export default function Footer() {
  return (
    <footer className="footer">
      <a href="/"><span className="footer-logo">◈ Annoying Link</span></a>
      <span className="footer-copy">
        © {new Date().getFullYear()} · Information Theory Implemented
      </span>
      <iframe
        src="https://ghbtns.com/github-btn.html?user=paydaypay1&repo=annoying-link&type=fork&size=medium&text=true"
        frameBorder="0"
        scrolling="0"
        width="175"
        height="50"
        title="Sponsor on GitHub"
      ></iframe>
    </footer>
  );
}
