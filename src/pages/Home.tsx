import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ParticleCanvas from '../components/ParticleCanvas'
import './Home.css'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  // Subtle parallax tilt on hero text on mouse move
  useEffect(() => {
    const hero = heroRef.current!
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window
      const x = (e.clientX / w - 0.5) * 14
      const y = (e.clientY / h - 0.5) * 8
      hero.style.transform = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg)`
    }
    const onLeave = () => { hero.style.transform = '' }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="home">
      {/* Particle background */}
      <div className="home-canvas-wrap">
        <ParticleCanvas />
      </div>

      {/* Radial glow blobs */}
      <div className="blob blob-teal" />
      <div className="blob blob-amber" />

      {/* Hero */}
      <section className="home-hero">
        <div className="hero-inner" ref={heroRef}>
          <p className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Open Source · Community Driven
          </p>

          <h1 className="hero-title">
            <span className="hero-line">We build things</span>
            <span className="hero-line accent">that matter.</span>
          </h1>

          <p className="hero-sub">
            A collective of makers, thinkers, and builders working on open tools
            for a better world. Every contribution pushes us forward.
          </p>

          <div className="hero-actions">
            <Link to="/donate" className="btn btn-primary">
              Support our work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="#about" className="btn btn-ghost">Learn more</a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="stats-bar">
        {[
          { value: '12k+', label: 'Contributors' },
          { value: '$840k', label: 'Raised to date' },
          { value: '200+', label: 'Projects funded' },
          { value: '47', label: 'Countries reached' },
        ].map(s => (
          <div className="stat" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* About section */}
      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title">Built by the community,<br />for the community.</h2>
            <p>
              Luminary is a nonprofit initiative that funds open-source
              infrastructure, educational tools, and research in underserved areas.
              We operate on radical transparency — every dollar is tracked publicly.
            </p>
            <p>
              Our model is simple: small, recurring contributions from many people
              create large, sustained impact for projects that corporations won't fund.
            </p>
            <Link to="/donate" className="btn btn-outline">Become a supporter →</Link>
          </div>

          <div className="about-cards">
            {[
              { icon: '⬡', title: 'Open Infrastructure', body: 'We build and maintain the invisible layer that thousands of projects rely on.' },
              { icon: '◎', title: 'Radical Transparency', body: 'Every grant, expense, and decision is published in real-time on our public ledger.' },
              { icon: '✦', title: 'Global Reach', body: 'From Lagos to Lahore, our projects reach developers in 47 countries.' },
            ].map(c => (
              <div className="about-card" key={c.title}>
                <span className="card-icon">{c.icon}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-logo">◈ Luminary</span>
        <span className="footer-copy">© {new Date().getFullYear()} · Built with intention</span>
        <Link to="/donate" className="footer-cta">Donate →</Link>
      </footer>
    </div>
  )
}
