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

const LOCATIONS = ['Maitama', 'Asokoro', 'Jahi', 'Wuse 2', 'Gwarinpa', 'Guzape', 'Lokogoma', 'Wuye', 'Mabuchi', 'Kado', 'Jabi', 'Idu', 'Lifecamp', 'Katampe Extension']

const WA_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.533 5.854L.057 23.882a.5.5 0 0 0 .61.61l6.088-1.467A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.876 0-3.637-.49-5.164-1.349l-.36-.21-3.814.919.938-3.742-.228-.374A9.963 9.963 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

const IG_SVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const SC_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M12.166.006C8.95.006 6.29 1.94 5.399 4.776c-.36 1.14-.27 2.628-.18 3.714-.3.12-.624.18-.948.18-.444 0-.876-.12-1.2-.312a.438.438 0 0 0-.228-.066c-.348 0-.612.264-.612.612 0 .276.168.516.432.612.084.024 1.776.528 1.956 1.596.012.072.024.144.042.204-.678.792-2.148 1.524-2.544 1.746-.516.3-.786.78-.654 1.272.126.432.552.726 1.086.726.108 0 .222-.012.33-.042.378-.102 1.296-.3 2.364-.3.42 0 .846.036 1.272.114a3.132 3.132 0 0 0-.054.618c0 1.71 1.398 3.108 3.108 3.108 1.71 0 3.108-1.398 3.108-3.108 0-.21-.018-.42-.054-.618.426-.078.852-.114 1.272-.114 1.068 0 1.986.198 2.364.3.108.03.222.042.33.042.534 0 .96-.294 1.086-.726.132-.492-.138-.972-.654-1.272-.396-.222-1.866-.954-2.544-1.746.018-.06.03-.132.042-.204.18-1.068 1.872-1.572 1.956-1.596.264-.096.432-.336.432-.612 0-.348-.264-.612-.612-.612a.438.438 0 0 0-.228.066c-.324.192-.756.312-1.2.312-.324 0-.648-.06-.948-.18.09-1.086.18-2.574-.18-3.714C17.842 1.94 15.182.006 12.166.006z"/>
  </svg>
)

const TT_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

const SOCIALS = [
  {
    label: 'WhatsApp',
    svg: WA_SVG,
    href: `${WA_BASE}?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20a%20property`,
  },
  {
    label: 'Instagram @property_mgr',
    svg: IG_SVG,
    href: 'https://www.instagram.com/property_mgr?igsh=c3F3NW4wamNmZm4y&utm_source=qr',
  },
  {
    label: 'Snapchat',
    svg: SC_SVG,
    href: 'https://snapchat.com/t/qC3xViDh',
  },
  {
    label: 'TikTok',
    svg: TT_SVG,
    href: 'https://www.tiktok.com/@property_elite?_r=1&_t=ZS-95oBOwMlS68',
  },
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
              Your ideal home<br />
              <em>awaits.</em>
            </h2>
            <p className="footer-cta__sub">
              Exclusive standards all guaranteed. Since 2018.
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
                <div className="footer-brand__sub">Homes &amp; Properties Co.</div>
              </div>
            </button>
            <p className="footer-brand__tagline">
              Premium residential rentals in Abuja, Nigeria.
              Transparent, fast and reliable. Since 2018.
            </p>
            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer-social"
                  title={s.label}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.svg}
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
              <a className="footer-contact footer-contact--link" href="tel:+2348133410003">
                <Phone size={13} strokeWidth={1.5} />
                <span>0813 341 0003</span>
              </a>
              <a className="footer-contact footer-contact--link" href="mailto:edejanet506@gmail.com">
                <Mail size={13} strokeWidth={1.5} />
                <span>edejanet506@gmail.com</span>
              </a>
              <div className="footer-contact">
                <Clock size={13} strokeWidth={1.5} />
                <span>Mon..Fri 8am..6pm · Sat 9am..4pm</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p className="footer-bottom__copy">
            © {new Date().getFullYear()} Jay Homes &amp; Properties. All rights reserved.
          </p>
          <div className="footer-bottom__links">
            <button className="footer-bottom__link" onClick={() => navigate('privacy')}>Privacy</button>
            <button className="footer-bottom__link" onClick={() => navigate('terms')}>Terms</button>
            <button className="footer-bottom__link" onClick={() => navigate('cookies')}>Cookies</button>
          </div>
        </div>

      </div>
    </footer>
  )
}
