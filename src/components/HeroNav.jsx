import { useState, useEffect } from 'react'
import { WA_BASE } from '../data'

const NAV_LINKS = [
  { id: 'home',         label: 'Home'       },
  { id: 'rentals',      label: 'Properties' },
  { id: 'agents',       label: 'Agents'     },
  { id: 'testimonials', label: 'Reviews'    },
  { id: 'faq',          label: 'FAQ'        },
  { id: 'contact',      label: 'Contact'    },
]

const WA_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.533 5.854L.057 23.882a.5.5 0 0 0 .61.61l6.088-1.467A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.876 0-3.637-.49-5.164-1.349l-.36-.21-3.814.919.938-3.742-.228-.374A9.963 9.963 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

function LogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="15" cy="15" r="13.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
      <clipPath id="lm-half">
        <rect x="0" y="0" width="15" height="30"/>
      </clipPath>
      <circle cx="15" cy="15" r="13.5" fill="white" clipPath="url(#lm-half)"/>
    </svg>
  )
}

export default function HeroNav({ navigate, page }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (id) => {
    navigate(id)
    setMenuOpen(false)
  }

  const waHref = `${WA_BASE}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20rental%20property.`

  return (
    <>
      <nav className={`hero-nav${scrolled ? ' hero-nav--scrolled' : ''}`}>
        <button className="hero-nav__logo" onClick={() => go('home')}>
          <LogoMark />
          <div className="hero-nav__logo-text">
            <span className="hero-nav__logo-name">JAY. G&trade;</span>
            <span className="hero-nav__logo-sub">Properties &amp; Rentals Co.</span>
          </div>
        </button>

        <div className="hero-nav__center">
          <div className="hero-nav__pill">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                className={`hero-nav__link${page === l.id ? ' hero-nav__link--active' : ''}`}
                onClick={() => go(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hero-nav__ctas">
          <a
            href={waHref}
            className="hero-nav__wa-inline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            {WA_SVG}
          </a>
          <button className="hero-nav__blog" onClick={() => go('contact')}>
            Contact
          </button>
          <button className="hero-nav__tour" onClick={() => go('apply')}>
            Book a Tour
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="hero-nav__hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="hero-nav__ham-line hero-nav__ham-line--a" />
            <span className="hero-nav__ham-line hero-nav__ham-line--b" />
            <span className="hero-nav__ham-line hero-nav__ham-line--c" />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`hn-overlay${menuOpen ? ' hn-overlay--open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div className={`hn-panel${menuOpen ? ' hn-panel--open' : ''}`} aria-modal="true" role="dialog">
        <button
          className="hn-panel__close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="3" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="15" y1="3" x2="3" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <ul className="hn-panel__links">
          {NAV_LINKS.map((l, i) => (
            <li key={l.id} className="hn-panel__item">
              <button
                className={`hn-panel__link${page === l.id ? ' hn-panel__link--active' : ''}`}
                style={{ transitionDelay: menuOpen ? `${i * 55}ms` : '0ms' }}
                onClick={() => go(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div
          className="hn-panel__foot"
          style={{
            opacity:          menuOpen ? 1 : 0,
            transform:        menuOpen ? 'translateY(0)' : 'translateY(10px)',
            transitionDelay:  menuOpen ? '0.32s' : '0s',
          }}
        >
          <button className="hn-panel__cta" onClick={() => go('apply')}>
            Apply to Rent
          </button>
          <a href={waHref} className="hn-panel__wa" target="_blank" rel="noopener noreferrer">
            {WA_SVG}
            Chat on WhatsApp
          </a>
          <span className="hn-panel__loc">Abuja, Nigeria</span>
        </div>
      </div>
    </>
  )
}
