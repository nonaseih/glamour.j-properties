import { useRef, useEffect, useState } from 'react'
import {
  ArrowLeft, MapPin, Bed, Bath, Car, Maximize2,
  Phone, Mail, ChevronDown, Volume2, VolumeX, Check,
} from 'lucide-react'
import { properties, agents, formatPrice, WA_BASE } from '../data'
import { PROPERTY_VIDEOS } from '../propertyVideos'

const WA_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.533 5.854L.057 23.882a.5.5 0 0 0 .61.61l6.088-1.467A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.876 0-3.637-.49-5.164-1.349l-.36-.21-3.814.919.938-3.742-.228-.374A9.963 9.963 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

const NAV_ITEMS = [
  ['overview',  'Overview'],
  ['amenities', 'Amenities'],
  ['fees',      'Fees'],
  ['agent',     'Agent'],
]

export default function PropertyDetailPage({ navigate, propertyId, fromPage }) {
  const property = properties.find((p) => p.id === propertyId) ?? properties[0]
  const agent    = agents.find((a) => a.id === property.agent)
  const video    = PROPERTY_VIDEOS[property.id] ?? null

  const videoRef     = useRef(null)
  const overviewRef  = useRef(null)
  const amenitiesRef = useRef(null)
  const feesRef      = useRef(null)
  const agentRef     = useRef(null)

  const sectionRefs = { overview: overviewRef, amenities: amenitiesRef, fees: feesRef, agent: agentRef }

  const [muted,         setMuted]         = useState(true)
  const [navVisible,    setNavVisible]    = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [property.id])

  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > window.innerHeight * 0.65)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.dataset.section) })
      },
      { rootMargin: '-35% 0px -60% 0px' }
    )
    Object.values(sectionRefs).forEach((r) => r.current && obs.observe(r.current))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (key) =>
    sectionRefs[key]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  const isSale = property.priceNote?.includes('asking')
  const fees = [
    [isSale ? 'Sale Price' : 'Annual Rent', property.annualRent],
    ['Caution Deposit',                     property.cautionFee],
    ['Agency Fee (5%)',                     property.agencyFee],
    ['Legal Fee (2.5%)',                    property.legalFee],
  ]
  const total = fees.reduce((s, [, v]) => s + (v || 0), 0)

  return (
    <div className="pd">

      {/* ── Fixed back button ── */}
      <button className="pd__back" onClick={() => navigate(fromPage || 'rentals')}>
        <ArrowLeft size={14} strokeWidth={2.5} />
        <span>Back</span>
      </button>

      {/* ── Floating section nav ── */}
      <nav className={`pd__floatnav${navVisible ? ' pd__floatnav--visible' : ''}`}>
        {NAV_ITEMS.map(([key, label]) => (
          <button
            key={key}
            className={`pd__floatnav-btn${activeSection === key ? ' pd__floatnav-btn--active' : ''}`}
            onClick={() => scrollTo(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* ── Hero ── */}
      <div className="pd__hero">
        {video
          ? <video ref={videoRef} src={video} className="pd__hero-video" autoPlay muted loop playsInline />
          : <div className="pd__hero-fallback" />
        }
        <div className="pd__hero-overlay" />

        {video && (
          <button className="pd__mute-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted ? <VolumeX size={15} strokeWidth={1.8} /> : <Volume2 size={15} strokeWidth={1.8} />}
          </button>
        )}

        <div className="pd__hero-content">
          <div className="pd__hero-badges">
            <span className={`pd__badge pd__badge--${property.status}`}>
              {property.status === 'available' ? '● Available' : '◌ Pending'}
            </span>
            <span className="pd__badge pd__badge--type">{property.type}</span>
          </div>
          <h1 className="pd__hero-title">{property.title}</h1>
          <div className="pd__hero-loc">
            <MapPin size={13} strokeWidth={1.5} />
            {property.location}
          </div>
          <div className="pd__hero-price">
            {formatPrice(property.price)}
            <span>{property.priceNote ?? '/yr'}</span>
          </div>
          {property.highlights && (
            <div className="pd__hero-chips">
              {property.highlights.map((h) => (
                <span key={h} className="pd__hero-chip">{h}</span>
              ))}
            </div>
          )}
        </div>

        <div className="pd__scroll-cue">
          <span>Scroll to explore</span>
          <ChevronDown size={16} strokeWidth={1.5} />
        </div>
      </div>

      {/* ── Stats band ── */}
      <div className="pd__statsband">
        <div className="pd__statsband-inner">
          {[
            { icon: <Bed size={24} strokeWidth={1.2} />,      num: property.bedrooms,  label: 'Bedrooms'       },
            { icon: <Bath size={24} strokeWidth={1.2} />,     num: property.bathrooms, label: 'Bathrooms'      },
            { icon: <Car size={24} strokeWidth={1.2} />,      num: property.parking,   label: 'Parking Spaces' },
            { icon: <Maximize2 size={24} strokeWidth={1.2} />, num: property.sqm,      label: 'Square Metres'  },
          ].map(({ icon, num, label }) => (
            <div key={label} className="pd__statsband-item">
              <div className="pd__statsband-icon">{icon}</div>
              <div className="pd__statsband-num">{num}</div>
              <div className="pd__statsband-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="pd__body">
        <div className="pd__inner">

          {/* ── Main ── */}
          <div className="pd__main">

            {/* Overview */}
            <div className="pd__section" ref={overviewRef} data-section="overview">
              <div className="pd__card pd__card--about">
                <div className="pd__section-label">About This Property</div>
                <p className="pd__desc">{property.description}</p>
                <div className="pd__district-pill">
                  <MapPin size={12} strokeWidth={1.5} />
                  {property.district} District · Abuja, FCT
                </div>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="pd__section" ref={amenitiesRef} data-section="amenities">
                <div className="pd__card">
                  <div className="pd__section-label">Amenities &amp; Features</div>
                  <div className="pd__amenity-grid">
                    {property.amenities.map((a) => (
                      <div key={a} className="pd__amenity">
                        <Check size={12} strokeWidth={2.5} className="pd__amenity-check" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Fees */}
            <div className="pd__section" ref={feesRef} data-section="fees">
              <div className="pd__card">
                <div className="pd__section-label">Fee Breakdown</div>
                <div className="pd__fee-table">
                  {fees.map(([label, val]) => (
                    <div key={label} className="pd__fee-row">
                      <span>{label}</span>
                      <span>{formatPrice(val)}</span>
                    </div>
                  ))}
                  <div className="pd__fee-row pd__fee-row--total">
                    <span>Total Move-in Cost</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <p className="pd__fee-note">All fees due at signing · Prices in Nigerian Naira (₦)</p>
              </div>
            </div>

          </div>

          {/* ── Sidebar ── */}
          <div className="pd__sidebar">

            {/* Price + actions */}
            <div className="pd__sidebar-card">
              <div className="pd__sidebar-status">
                <span className={`pd__badge pd__badge--${property.status}`}>
                  {property.status === 'available' ? '● Available Now' : '◌ Pending'}
                </span>
              </div>
              <div className="pd__sidebar-price">
                {formatPrice(property.price)}
                <span>{property.priceNote ?? '/yr'}</span>
              </div>
              <p className="pd__sidebar-price-sub">
                {isSale ? 'Sale price · open to negotiation' : 'Annual rent · excl. fees'}
              </p>
              <div className="pd__sidebar-divider" />
              <div className="pd__sidebar-actions">
                <button className="pd__btn-primary" onClick={() => navigate('apply')}>
                  Apply to Rent
                </button>
                <a
                  href={`${WA_BASE}?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(property.title)}%20at%20${encodeURIComponent(property.location)}.`}
                  className="pd__btn-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WA_SVG}
                  WhatsApp Enquiry
                </a>
                <button className="pd__btn-ghost" onClick={() => navigate('contact')}>
                  Contact an Agent
                </button>
              </div>
            </div>

            {/* Agent */}
            {agent && (
              <div className="pd__sidebar-card pd__agent-card" ref={agentRef} data-section="agent">
                <div className="pd__section-label">Your Agent</div>
                <div className="pd__agent-top">
                  <div className="pd__agent-avatar">{agent.initials}</div>
                  <div className="pd__agent-info">
                    <div className="pd__agent-name">{agent.name}</div>
                    <div className="pd__agent-role">{agent.role}</div>
                    <div className="pd__agent-rating">
                      {'★'.repeat(5)}<span>{agent.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="pd__agent-stats">
                  <div className="pd__agent-stat">
                    <span>{agent.closed}+</span>Deals Closed
                  </div>
                  <div className="pd__agent-stat">
                    <span>{agent.listings}</span>Active Listings
                  </div>
                </div>
                <div className="pd__agent-contacts">
                  <a href={`tel:${agent.phone}`} className="pd__agent-contact">
                    <Phone size={13} strokeWidth={1.5} />{agent.phone}
                  </a>
                  <a href={`mailto:${agent.email}`} className="pd__agent-contact">
                    <Mail size={13} strokeWidth={1.5} />{agent.email}
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="pd__bottom-cta">
          <div className="pd__bottom-cta__inner">
            <div className="pd__bottom-cta__text">
              <h3 className="pd__bottom-cta__h3">
                Ready to make<br /><em>this yours?</em>
              </h3>
              <p className="pd__bottom-cta__sub">
                Apply online in minutes. Our agents handle everything from inspection to key handover.
              </p>
            </div>
            <div className="pd__bottom-cta__actions">
              <button className="pd__btn-primary" onClick={() => navigate('apply')}>
                Apply to Rent
              </button>
              <button className="pd__btn-ghost pd__btn-ghost--wide" onClick={() => navigate('rentals')}>
                Browse More Properties →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
