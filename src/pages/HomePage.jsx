import { useState, useEffect } from 'react'
import { Users, Eye, ShieldCheck, Zap, Gem } from 'lucide-react'
import PropertyCard from '../components/PropertyCard'
import { properties, values, WA_BASE } from '../data'
import heroImg from '../assets/JAY hero image.jpg'

const NAV_LINKS = [
  { id: 'home',         label: 'Home' },
  { id: 'rentals',      label: 'Properties' },
  { id: 'agents',       label: 'Agents' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'faq',          label: 'FAQ' },
]

const STATS = [
  { num: '200+', label: 'Homes Let' },
  { num: '12+', label: 'Years Experience' },
  { num: '98%', label: 'Client Satisfaction' },
  { num: '4', label: 'Expert Agents' },
]

const VALUE_TILES = [
  { num: '01', icon: Eye,          title: 'Transparency', variant: 'glass'  },
  { num: '02', icon: ShieldCheck,  title: 'Trust',        variant: 'white'  },
  { num: '03', icon: Zap,          title: 'Speed',        variant: 'yellow' },
  { num: '04', icon: Gem,          title: 'Quality',      variant: 'dark'   },
]

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

function ProgressRing({ pct = 98, r = 26 }) {
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <svg width={r * 2 + 8} height={r * 2 + 8} viewBox={`0 0 ${r * 2 + 8} ${r * 2 + 8}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={r + 4} cy={r + 4} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3"/>
      <circle
        cx={r + 4} cy={r + 4} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="3"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function HomePage({ navigate, page }) {
  const featured = properties.filter((p) => p.featured)
  const currentPage = page || 'home'
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 72)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Fixed WA button — nav level, far right ── */}
      <a
        href={`${WA_BASE}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20rental%20property.`}
        className="hero-nav__wa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.533 5.854L.057 23.882a.5.5 0 0 0 .61.61l6.088-1.467A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.876 0-3.637-.49-5.164-1.349l-.36-.21-3.814.919.938-3.742-.228-.374A9.963 9.963 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>

      {/* ── Hero Stage ── */}
      <section className="hero-stage">
        <div className="hero">
          <img className="hero-bg" src={heroImg} alt="" aria-hidden="true" />
          <div className="hero-vignette" />

          {/* ── Internal Nav ── */}
          <nav className={`hero-nav${navScrolled ? ' hero-nav--scrolled' : ''}`}>
            <button className="hero-nav__logo" onClick={() => navigate('home')}>
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
                    className={`hero-nav__link${currentPage === l.id ? ' hero-nav__link--active' : ''}`}
                    onClick={() => navigate(l.id)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-nav__ctas">
              <button className="hero-nav__blog" onClick={() => navigate('contact')}>
                Contact
              </button>
              <button className="hero-nav__tour" onClick={() => navigate('apply')}>
                Book a Tour
              </button>
            </div>
          </nav>

          {/* ── Headline ── */}
          <div className="hero-headline">
            <div className="hero-headline__eyebrow">
              <div className="hero-headline__eyebrow-dot" />
              <span className="hero-headline__eyebrow-label">Discover Your Next Home</span>
            </div>
            <h1>
              Find your perfect<br />
              <em>Abuja rental</em> —<br />
              homes worth living in.
            </h1>
            <p className="hero-headline__sub">
              Browse hand-picked rentals across Maitama, Jahi, Asokoro and beyond.
              Tour fast, apply online, move in without the hassle.
            </p>
          </div>

          {/* ── Trust / Rating ── */}
          <div className="hero-trust">
            <div className="hero-trust__stars">
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <div className="hero-trust__score-row">
              <span className="hero-trust__score">4.9</span>
            </div>
            <div className="hero-trust__sub">/&nbsp;200+ Tenant reviews</div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="hero-stats">
            {/* Card 1 — glass: Homes Let */}
            <div className="hero-stat hero-stat--glass">
              <div className="hero-stat__thumb-row">
                <div className="hero-stat__thumb">Photo</div>
                <span className="hero-stat__label">Homes Let</span>
              </div>
              <div className="hero-stat__num">200+</div>
              <div className="hero-stat__sub">Premium properties across Abuja FCT</div>
            </div>

            {/* Card 2 — dark: Tenant Trust */}
            <div className="hero-stat hero-stat--dark">
              <div className="hero-stat__ring-row">
                <ProgressRing pct={98} r={22} />
                <div className="hero-stat__chip">↗</div>
              </div>
              <span className="hero-stat__label">Tenant Trust</span>
              <div className="hero-stat__num">98%</div>
              <div className="hero-stat__sub">tenants report a smooth move-in — backed by quick-response support.</div>
            </div>

            {/* Card 3 — glass: Reach */}
            <div className="hero-stat hero-stat--glass" style={{ flexDirection: 'row', gap: '12px' }}>
              <div className="hero-stat__dual">
                <div className="hero-stat__dual-item">
                  <span className="hero-stat__dual-num hero-stat__dual-num--lg">1,000+</span>
                  <span className="hero-stat__dual-label">Tenants Placed</span>
                </div>
                <div className="hero-stat__dual-item">
                  <span className="hero-stat__dual-num hero-stat__dual-num--sm">12+</span>
                  <span className="hero-stat__dual-label">Years in Market</span>
                </div>
              </div>
              <div className="hero-stat__peach-chip">↗</div>
            </div>

            {/* Card 4 — white: Rating + Testimonial */}
            <div className="hero-stat hero-stat--white">
              <div className="hero-stat__top-row">
                <div className="hero-stat__num" style={{ marginTop: 0 }}>4.9★</div>
                <span className="hero-stat__tag">Top rated</span>
              </div>
              <p className="hero-stat__quote">
                "Moving into our Maitama home was seamless — Jay. G handled everything."
              </p>
              <div className="hero-stat__author">
                <div className="hero-stat__avatar">AM</div>
                <span className="hero-stat__author-name">Amara M.</span>
                <span className="hero-stat__author-stars">★★★★★</span>
              </div>
            </div>
          </div>

          {/* ── Footer Row ── */}
          <div className="hero-foot">
            <div className="hero-foot__scroll">
              <div className="hero-foot__scroll-dot" />
              Scroll to explore
            </div>
            <button className="hero-foot__center-btn" onClick={() => navigate('faq')}>
              How It Works
            </button>
            <div className="hero-foot__icons">
              <button className="hero-foot__icon-btn" aria-label="Help">?</button>
              <button className="hero-foot__icon-btn" aria-label="Browse properties" onClick={() => navigate('rentals')}>→</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <div className="about-stage">
        <div className="about-card">

          {/* Visual */}
          <div className="about-visual">
            <div className="about-visual__img">
              <Users size={72} stroke="white" strokeWidth={1} style={{ opacity: 0.15 }} />
            </div>
            <div className="about-chips">
              <div className="about-chip">
                <div className="about-chip__num">200+</div>
                <div className="about-chip__label">Homes Let</div>
              </div>
              <div className="about-chip about-chip--peach">
                <div className="about-chip__num">98%</div>
                <div className="about-chip__label">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <div className="about-eyebrow">
              <div className="about-eyebrow__dot" />
              <span>Who We Are</span>
            </div>

            <h2 className="about-h2">
              Abuja's most trusted<br />
              <em>rental partner</em>
            </h2>

            <p className="about-body">
              Since 2012, Jay. G Properties &amp; Rentals has been the go-to partner for
              discerning tenants seeking quality homes across the Federal Capital Territory.
              No hidden fees, no pressure, no surprises.
            </p>
            <p className="about-body">
              Our team of four expert agents has unmatched knowledge of Abuja's residential
              districts — from Asokoro to the family-friendly suburbs of Gwarinpa.
            </p>

            <div className="about-stats-row">
              <div className="about-stat">
                <div className="about-stat__num">12+</div>
                <div className="about-stat__label">Years Active</div>
              </div>
              <div className="about-stat">
                <div className="about-stat__num">4</div>
                <div className="about-stat__label">Expert Agents</div>
              </div>
              <div className="about-stat">
                <div className="about-stat__num">FCT</div>
                <div className="about-stat__label">Wide Coverage</div>
              </div>
            </div>

            <div className="about-actions">
              <button className="about-btn-primary" onClick={() => navigate('agents')}>
                Meet Our Team
              </button>
              <button className="about-btn-ghost" onClick={() => navigate('rentals')}>
                Browse Properties →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Values ── */}
      <div className="values-stage">
        <div className="values-wrap">

          {/* Intro panel */}
          <div className="values-intro">
            <div className="values-eyebrow">
              <div className="values-eyebrow__dot" />
              <span>Our Principles</span>
            </div>
            <h2 className="values-h2">
              Four things that<br />
              <em>set us apart</em>
            </h2>
            <p className="values-body">
              We built our agency around what Abuja renters told us mattered most —
              and we've never compromised on any of them.
            </p>
            <button className="values-cta" onClick={() => navigate('faq')}>
              How it works →
            </button>
          </div>

          {/* Bento grid */}
          <div className="values-bento">
            {VALUE_TILES.map((tile, i) => {
              const Icon = tile.icon
              return (
                <div key={tile.num} className={`values-tile values-tile--${tile.variant}`}>
                  <span className="values-tile__num">{tile.num}</span>
                  <div className="values-tile__icon">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="values-tile__title">{tile.title}</h3>
                  <p className="values-tile__body">{values[i].body}</p>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* ── Featured Properties ── */}
      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="section-header flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="label">Handpicked For You</p>
              <h2>Featured Properties</h2>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('rentals')}>
              View All Listings
            </button>
          </div>

          <div className="grid-2">
            {featured.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                navigate={navigate}
                onViewDetails={() => navigate('rentals')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="container">
          <p className="label label--light" style={{ marginBottom: '0.75rem' }}>Ready to Move?</p>
          <h2>Your Dream Home is One Application Away</h2>
          <p>Start your rental application today — it only takes a few minutes and our team will guide you through every step.</p>
          <div className="cta-banner__actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('apply')}>
              Apply to Rent
            </button>
            <button className="btn btn-outline-white btn-lg" onClick={() => navigate('contact')}>
              Talk to an Agent
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
