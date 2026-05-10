import { useState, useEffect, useRef } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import HouseLogo from './HouseLogo'
import { WA_BASE } from '../data'

const NAV_LINKS = [
  ['home',         'Home'],
  ['rentals',      'Browse Properties'],
  ['agents',       'Our Agents'],
  ['testimonials', 'Reviews'],
  ['faq',          'FAQ'],
  ['apply',        'Apply to Rent'],
]

const LOCATIONS = ['Maitama', 'Asokoro', 'Jahi', 'Wuse 2', 'Gwarinpa', 'Garki', 'Katampe', 'Utako']

const SOCIALS = [
  { label: 'WA', href: `${WA_BASE}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20property.` },
  { label: 'IG', href: '#' },
  { label: 'FB', href: '#' },
  { label: 'X',  href: '#' },
  { label: 'TT', href: '#' },
]

export default function Footer({ navigate }) {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <footer className={`footer-stage${revealed ? ' footer-stage--revealed' : ''}`} ref={ref}>
      <div className="footer-wrap">

        {/* ── CTA ── */}
        <div className="footer-cta">
          <div className="footer-cta__text">
            <h2 className="footer-cta__h2">
              Your perfect home<br />
              <em>is waiting.</em>
            </h2>
            <p className="footer-cta__sub">
              Browse hand-picked rentals across Abuja's most desirable districts.
            </p>
          </div>
          <div className="footer-cta__actions">
            <button className="footer-cta__primary" onClick={() => navigate('apply')}>
              Apply to Rent
            </button>
            <button className="footer-cta__ghost" onClick={() => navigate('rentals')}>
              Browse Properties →
            </button>
          </div>
        </div>

        <div className="footer-rule" />

        {/* ── Grid ── */}
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <button className="footer-brand__logo" onClick={() => navigate('home')}>
              <HouseLogo size={22} />
              <div>
                <div className="footer-brand__name">JAY. G™</div>
                <div className="footer-brand__sub">Properties &amp; Rentals Co.</div>
              </div>
            </button>
            <p className="footer-brand__tagline">
              Premium residential rentals in Abuja, Nigeria.
              Transparent, fast, and professional — since 2012.
            </p>
            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer-social"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <div className="footer-col__title">Quick Links</div>
            <nav className="footer-col__links">
              {NAV_LINKS.map(([id, label]) => (
                <button key={id} className="footer-col__link" onClick={() => navigate(id)}>
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Locations */}
          <div className="footer-col">
            <div className="footer-col__title">Locations</div>
            <nav className="footer-col__links">
              {LOCATIONS.map((loc) => (
                <button key={loc} className="footer-col__link" onClick={() => navigate('rentals')}>
                  {loc}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <div className="footer-col__title">Get in Touch</div>
            <div className="footer-col__links">
              <div className="footer-contact">
                <MapPin size={13} strokeWidth={1.5} />
                <span>Plot 4B, Wuse Zone 6, Abuja, FCT</span>
              </div>
              <div className="footer-contact">
                <Phone size={13} strokeWidth={1.5} />
                <span>+234 802 000 0001</span>
              </div>
              <div className="footer-contact">
                <Mail size={13} strokeWidth={1.5} />
                <span>hello@jaygproperties.com</span>
              </div>
              <div className="footer-contact">
                <Clock size={13} strokeWidth={1.5} />
                <span>Mon–Fri 8am–6pm · Sat 9am–4pm</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p className="footer-bottom__copy">
            © {new Date().getFullYear()} Jay. G Properties &amp; Rentals. All rights reserved.
          </p>
          <div className="footer-bottom__links">
            <a href="#" className="footer-bottom__link">Privacy</a>
            <a href="#" className="footer-bottom__link">Terms</a>
            <a href="#" className="footer-bottom__link">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
