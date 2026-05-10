import { useState, useEffect, useRef } from 'react'
import { Users, Eye, ShieldCheck, Zap, Gem, MapPin } from 'lucide-react'
import { properties, values, formatPrice, WA_BASE } from '../data'
import heroImg from '../assets/JAY hero image.jpg'
import certImg from '../assets/C jay.jpg'
import HeroNav from '../components/HeroNav'
const FEAT_VIDEOS = [
  'https://res.cloudinary.com/dqrssdcmu/video/upload/v1778335442/glamourj-featured-1.mp4',
  'https://res.cloudinary.com/dqrssdcmu/video/upload/v1778335484/glamourj-featured-2.mp4',
  'https://res.cloudinary.com/dqrssdcmu/video/upload/v1778335521/glamourj-featured-3.mp4',
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
  const [certOpen, setCertOpen] = useState(false)
  const [videoPaused, setVideoPaused] = useState([false, false, false])
  const [videoRevealed, setVideoRevealed] = useState(false)
  const [spotlightRevealed, setSpotlightRevealed] = useState(false)
  const [aboutRevealed, setAboutRevealed] = useState(false)
  const [valuesRevealed, setValuesRevealed] = useState(false)
  const [vidbandRevealed, setVidbandRevealed] = useState(false)
  const spotlightRef = useRef(null)
  const aboutRef = useRef(null)
  const valuesRef = useRef(null)
  const vidbandRef = useRef(null)
  const heroBgRef = useRef(null)
  const videoRefs = [useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    const onScroll = () => {
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoRevealed(true)
          videoRefs.forEach(r => r.current?.play().catch(() => {}))
          obs.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setSpotlightRevealed(entry.isIntersecting),
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = aboutRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setAboutRevealed(entry.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = valuesRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setValuesRevealed(entry.isIntersecting),
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = vidbandRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setVidbandRevealed(entry.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const toggleVideo = (idx) => {
    const video = videoRefs[idx].current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setVideoPaused(s => s.map((v, i) => i === idx ? false : v))
    } else {
      video.pause()
      setVideoPaused(s => s.map((v, i) => i === idx ? true : v))
    }
  }

  return (
    <>
      <HeroNav navigate={navigate} page={currentPage} />

      {/* ── Hero Stage ── */}
      <section className="hero-stage">
        <div className="hero">
          <img ref={heroBgRef} className="hero-bg" src={heroImg} alt="" aria-hidden="true" />
          <div className="hero-vignette" />

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
                <button className="hero-stat__chip" onClick={() => navigate('testimonials')} aria-label="View tenant reviews">↗</button>
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
              <button className="hero-stat__peach-chip" onClick={() => navigate('agents')} aria-label="Meet our agents">↗</button>
            </div>

            {/* Card 4 — white: Rating + Testimonial */}
            <div className="hero-stat hero-stat--white">
              <div className="hero-stat__top-row">
                <div className="hero-stat__num" style={{ marginTop: 0 }}>4.9★</div>
                <button className="hero-stat__tag" onClick={() => navigate('testimonials')} aria-label="Read all reviews">Top rated</button>
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
              <button className="hero-foot__icon-btn" aria-label="Help" onClick={() => navigate('faq')}>?</button>
              <button className="hero-foot__icon-btn" aria-label="Browse properties" onClick={() => navigate('rentals')}>→</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <div className="about-stage">
        <div className={`about-card${aboutRevealed ? ' about-card--revealed' : ''}`} ref={aboutRef}>

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
        <div className={`values-wrap${valuesRevealed ? ' values-wrap--revealed' : ''}`} ref={valuesRef}>

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
                <div key={tile.num} className={`values-tile values-tile--${tile.variant}`} style={{ '--tile-i': i }}>
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

      {/* ── Certificate Strip ── */}
      <div className="cert-stage">
        <div className="cert-strip">
          <div className="cert-info">
            <div className="cert-badge">
              <ShieldCheck size={13} strokeWidth={2} />
              CAC Registered Business
            </div>
            <h3 className="cert-title">Officially Licensed &amp; Registered</h3>
            <p className="cert-sub">
              Jay. G Properties &amp; Rentals is a fully registered business with the
              Corporate Affairs Commission of Nigeria — operating transparently since 2012.
            </p>
          </div>
          <button className="cert-thumb-btn" onClick={() => setCertOpen(true)} aria-label="View certificate of registration">
            <img className="cert-thumb" src={certImg} alt="Certificate of Registration" />
            <div className="cert-thumb__overlay">
              <span className="cert-thumb__cta">View Certificate →</span>
            </div>
          </button>
        </div>
      </div>

      {/* Certificate Lightbox */}
      {certOpen && (
        <div className="cert-overlay" onClick={() => setCertOpen(false)}>
          <div className="cert-lightbox" onClick={(e) => e.stopPropagation()}>
            <button className="cert-lightbox__close" onClick={() => setCertOpen(false)} aria-label="Close">✕</button>
            <img className="cert-lightbox__img" src={certImg} alt="Certificate of Registration" />
          </div>
        </div>
      )}

      {/* ── Featured Spotlight ── */}
      <div className={`spotlight-stage${spotlightRevealed ? ' spotlight-stage--revealed' : ''}`} ref={spotlightRef}>

        {/* Feature 1 — large landscape card */}
        {featured[0] && (
          <div className="spotlight-wrap">
            <div className={`spotlight-media${videoRevealed ? ' spotlight-media--revealed' : ''}`}>
              <video
                ref={videoRefs[0]}
                src={FEAT_VIDEOS[0]}
                className="spotlight-video"
                muted
                loop
                playsInline
              />
              <div className="spotlight-media__ui">
                <span className="spotlight-media__tag">Property Tour</span>
                <button
                  className="spotlight-media__play"
                  aria-label={videoPaused[0] ? 'Play tour' : 'Pause tour'}
                  onClick={() => toggleVideo(0)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    {videoPaused[0]
                      ? <path d="M8 5v14l11-7z" />
                      : <><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></>
                    }
                  </svg>
                </button>
                <span className="spotlight-media__hint">{videoPaused[0] ? 'Click to play' : 'Click to pause'}</span>
              </div>
            </div>
            <div className="spotlight-info">
              <div className="spotlight-eyebrow">
                <div className="spotlight-eyebrow__dot" />
                <span>Featured Property</span>
              </div>
              <h2 className="spotlight-h2">{featured[0].title}</h2>
              <div className="spotlight-loc">
                <MapPin size={13} strokeWidth={1.5} />
                {featured[0].location}
              </div>
              <div className="spotlight-price">
                {formatPrice(featured[0].price)}
                <span>{featured[0].priceNote ?? '/yr'}</span>
              </div>
              <div className="spotlight-chips">
                {(featured[0].highlights ?? [`${featured[0].bedrooms} Beds`, `${featured[0].bathrooms} Baths`, `${featured[0].sqm} sqm`]).map(h => (
                  <span key={h} className="spotlight-chip">{h}</span>
                ))}
              </div>
              <p className="spotlight-desc">{featured[0].description}</p>
              <button className="spotlight-view-btn" onClick={() => navigate('property', featured[0].id)}>
                View Property →
              </button>
            </div>
          </div>
        )}

        {/* Features 2 & 3 — duo of portrait cards */}
        {featured.length > 1 && (
          <div className="spotlight-duo">
            {featured.slice(1).map((prop, i) => {
              const idx = i + 1
              return (
                <div key={prop.id} className="spotlight-card-sm">
                  <div className={`spotlight-media-sm${videoRevealed ? ' spotlight-media--revealed' : ''}`}>
                    {FEAT_VIDEOS[idx] ? (
                      <video
                        ref={videoRefs[idx]}
                        src={FEAT_VIDEOS[idx]}
                        className="spotlight-video"
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <div className="spotlight-media-sm__placeholder" />
                    )}
                    <div className="spotlight-media__ui">
                      <span className="spotlight-media__tag">Property Tour</span>
                      {FEAT_VIDEOS[idx] && (
                        <button
                          className="spotlight-media__play"
                          aria-label={videoPaused[idx] ? 'Play tour' : 'Pause tour'}
                          onClick={() => toggleVideo(idx)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            {videoPaused[idx]
                              ? <path d="M8 5v14l11-7z" />
                              : <><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></>
                            }
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="spotlight-info-sm">
                    <div className="spotlight-eyebrow">
                      <div className="spotlight-eyebrow__dot" />
                      <span>Featured Property</span>
                    </div>
                    <h3 className="spotlight-h3-sm">{prop.title}</h3>
                    <div className="spotlight-loc">
                      <MapPin size={13} strokeWidth={1.5} />
                      {prop.location}
                    </div>
                    <div className="spotlight-price-sm">
                      {formatPrice(prop.price)}
                      <span>{prop.priceNote ?? '/yr'}</span>
                    </div>
                    <div className="spotlight-chips">
                      {(prop.highlights ?? [`${prop.bedrooms} Beds`]).map(h => (
                        <span key={h} className="spotlight-chip">{h}</span>
                      ))}
                    </div>
                    <button className="spotlight-view-btn" onClick={() => navigate('property', prop.id)}>
                      View Property →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>

      {/* ── Stats Reel ── */}
      <div className={`vidband-stage${vidbandRevealed ? ' vidband-stage--revealed' : ''}`} ref={vidbandRef}>
        <div className="vidband">
          <div className="vidband__inner">

            <div className="vidband__text">
              <div className="vidband__eyebrow">
                <div className="vidband__eyebrow-dot" />
                <span>Track Record</span>
              </div>
              <h2 className="vidband__h2">
                Built on<br />
                <em>results.</em>
              </h2>
              <p className="vidband__sub">
                Since 2012, we've helped over a thousand families settle into the right home
                across every district of the Federal Capital Territory.
              </p>
            </div>

            <div className="vidband__stats">
              {[
                { num: '200+',   label: 'Homes Let',        sub: 'across Abuja FCT' },
                { num: '1,000+', label: 'Tenants Placed',   sub: 'since 2012'       },
                { num: '12+',    label: 'Years Active',      sub: 'in the market'    },
                { num: '98%',    label: 'Satisfaction Rate', sub: 'tenant surveys'   },
              ].map((s) => (
                <div key={s.label} className="vidband__stat">
                  <div className="vidband__stat-num">{s.num}</div>
                  <div className="vidband__stat-label">{s.label}</div>
                  <div className="vidband__stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
