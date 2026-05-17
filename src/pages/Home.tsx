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
            Creative Development · Connectivity Driven
          </p>

          <h1 className="hero-title">
            <span className="hero-line">We build</span>
            <span className="hero-line accent">things.</span>
          </h1>

          <p className="hero-sub">
            A place for of making, thinking, and building tools
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

      {/* About section */}
      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title">Building for better connectivity.</h2>
            <p>
              Always working for more trustworthy information systems do reduce confusion.
            </p>
            <p>
              Our model is simple: small, contributions to sustain creative concept creation.
            </p>
            <Link to="/donate" className="btn btn-outline">Become a supporter →</Link>
          </div>

          <div className="about-cards">
            {[
              { icon: '⬡', title: 'Open Infrastructure', body: 'We build and maintain some of the invisible layers that many projects rely on.' },
              { icon: '◎', title: 'Creative Innovation', body: 'Always seeking different perespectives to assess future goals. '}
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
    </div>
  )
}
