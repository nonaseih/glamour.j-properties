import HouseLogo from './HouseLogo'
import { WA_BASE } from '../data'

const SOCIALS = [
  { label: 'WA', href: WA_BASE + '?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20property.' },
  { label: 'IG', href: '#' },
  { label: 'FB', href: '#' },
  { label: 'X', href: '#' },
  { label: 'TT', href: '#' },
]

export default function Footer({ navigate }) {
  const go = (id) => (e) => { e.preventDefault(); navigate(id) }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <button onClick={go('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
              <HouseLogo size={30} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.02em' }}>
                  Jay. G Properties
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '0.68rem', color: 'rgba(255,255,255,.4)' }}>
                  & Rentals
                </div>
              </div>
            </button>
            <p className="footer__tagline">
              Premium residential rentals in Abuja, Nigeria. Transparent, fast, and professional — since 2012.
            </p>
            <div className="footer__socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} className="footer__social" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer__col-title">Quick Links</div>
            <div className="footer__links">
              {[
                ['home', 'Home'],
                ['rentals', 'Browse Rentals'],
                ['agents', 'Our Agents'],
                ['testimonials', 'Reviews'],
                ['faq', 'FAQ'],
                ['apply', 'Apply to Rent'],
              ].map(([id, label]) => (
                <button key={id} className="footer__link" onClick={go(id)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="footer__col-title">Locations</div>
            <div className="footer__links">
              {['Maitama', 'Asokoro', 'Jahi', 'Wuse 2', 'Gwarinpa', 'Garki', 'Katampe', 'Utako'].map((loc) => (
                <button key={loc} className="footer__link" onClick={go('rentals')}>
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="footer__col-title">Contact Us</div>
            <div className="footer__links">
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                <span>Plot 4B, Wuse Zone 6, Abuja, FCT, Nigeria</span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📞</span>
                <span>+234 802 000 0001</span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">✉</span>
                <span>hello@jaygproperties.com</span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">🕐</span>
                <span>Mon–Fri 8am–6pm · Sat 9am–4pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Jay. G Properties & Rentals. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Service</a>
            <a href="#" className="footer__bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
