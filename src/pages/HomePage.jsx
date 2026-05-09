import PropertyCard from '../components/PropertyCard'
import { properties, values } from '../data'
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

const VALUE_ICONS = {
  T: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  S: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Q: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const getValueIcon = (v, i) => {
  if (i === 0 || i === 1) return VALUE_ICONS.T
  if (i === 2) return VALUE_ICONS.S
  return VALUE_ICONS.Q
}

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

  return (
    <>
      {/* ── Hero Stage ── */}
      <section className="hero-stage">
        <div className="hero">
          <img className="hero-bg" src={heroImg} alt="" aria-hidden="true" />
          <div className="hero-vignette" />

          {/* ── Internal Nav ── */}
          <nav className="hero-nav">
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

      {/* ── Stats Bar ── */}
      <div className="stats-bar">
        <div className="stats-bar__inner">
          {STATS.map((s) => (
            <div key={s.label} className="stats-bar__item">
              <div className="stats-bar__num">{s.num}</div>
              <div className="stats-bar__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <section className="about section">
        <div className="container">
          <div className="about__split">
            <div className="about__visual">
              <div className="about__img-main img-placeholder">
                <span>Office & Team</span>
              </div>
              <div className="about__img-accent img-placeholder">
                <span>Happy Tenants</span>
              </div>
            </div>

            <div className="about__content">
              <p className="label">Who We Are</p>
              <h2>Abuja's Most Trusted Rental Agency</h2>
              <p>
                Since 2012, Jay. G Properties & Rentals has been the go-to partner for
                discerning tenants seeking quality homes across the Federal Capital Territory.
                We operate on a simple principle: no hidden fees, no pressure, no surprises.
              </p>
              <p>
                Our team of four expert agents has an unmatched knowledge of Abuja's residential
                districts — from the diplomatic enclave of Asokoro to the family-friendly
                suburbs of Gwarinpa.
              </p>

              <div className="about__stats">
                <div>
                  <div className="about__stat-num">200+</div>
                  <div className="about__stat-label">Families Housed</div>
                </div>
                <div>
                  <div className="about__stat-num">98%</div>
                  <div className="about__stat-label">5-Star Reviews</div>
                </div>
                <div>
                  <div className="about__stat-num">12+</div>
                  <div className="about__stat-label">Years in Market</div>
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => navigate('agents')}>
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="values section">
        <div className="container">
          <div className="section-header section-header--center">
            <p className="label">Our Principles</p>
            <h2>Why Tenants Choose Us</h2>
            <p>We've built our agency around the four things Abuja renters told us mattered most.</p>
          </div>

          <div className="grid-4">
            {values.map((v, i) => (
              <div key={v.id} className="value-card">
                <div className="value-card__icon">
                  {getValueIcon(v, i)}
                </div>
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
