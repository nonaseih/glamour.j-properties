import { useState } from 'react'
import { MapPin, ArrowRight, Clock } from 'lucide-react'
import { WA_BASE } from '../data'
import HeroNav from '../components/HeroNav'
import Reveal from '../components/Reveal'
import heroImg from '../assets/JAY hero image.jpg'

const WA_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.533 5.854L.057 23.882a.5.5 0 0 0 .61.61l6.088-1.467A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.876 0-3.637-.49-5.164-1.349l-.36-.21-3.814.919.938-3.742-.228-.374A9.963 9.963 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

const IG_SVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const SC_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12.166.006C8.95.006 6.29 1.94 5.399 4.776c-.36 1.14-.27 2.628-.18 3.714-.3.12-.624.18-.948.18-.444 0-.876-.12-1.2-.312a.438.438 0 0 0-.228-.066c-.348 0-.612.264-.612.612 0 .276.168.516.432.612.084.024 1.776.528 1.956 1.596.012.072.024.144.042.204-.678.792-2.148 1.524-2.544 1.746-.516.3-.786.78-.654 1.272.126.432.552.726 1.086.726.108 0 .222-.012.33-.042.378-.102 1.296-.3 2.364-.3.42 0 .846.036 1.272.114a3.132 3.132 0 0 0-.054.618c0 1.71 1.398 3.108 3.108 3.108 1.71 0 3.108-1.398 3.108-3.108 0-.21-.018-.42-.054-.618.426-.078.852-.114 1.272-.114 1.068 0 1.986.198 2.364.3.108.03.222.042.33.042.534 0 .96-.294 1.086-.726.132-.492-.138-.972-.654-1.272-.396-.222-1.866-.954-2.544-1.746.018-.06.03-.132.042-.204.18-1.068 1.872-1.572 1.956-1.596.264-.096.432-.336.432-.612 0-.348-.264-.612-.612-.612a.438.438 0 0 0-.228.066c-.324.192-.756.312-1.2.312-.324 0-.648-.06-.948-.18.09-1.086.18-2.574-.18-3.714C17.842 1.94 15.182.006 12.166.006z"/>
  </svg>
)

const TT_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

const SOCIALS = [
  { label: 'WhatsApp',                handle: '0813 341 0003',          color: '#25D366', bg: 'rgba(37,211,102,0.12)',  svg: WA_SVG, href: WA_BASE + '?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20a%20property' },
{ label: 'Instagram @property_mgr',      handle: '@property_mgr',       color: '#E1306C', bg: 'rgba(225,48,108,0.1)',   svg: IG_SVG, href: 'https://www.instagram.com/property_mgr?igsh=c3F3NW4wamNmZm4y&utm_source=qr' },
  { label: 'Snapchat',                     handle: 'exclusive_chateau',    color: '#8a7200', bg: 'rgba(255,235,0,0.14)',   svg: SC_SVG, href: 'https://snapchat.com/t/qC3xViDh' },
  { label: 'TikTok',                       handle: '@property_elite',      color: '#010101', bg: 'rgba(0,0,0,0.07)',       svg: TT_SVG, href: 'https://www.tiktok.com/@property_elite?_r=1&_t=ZS-95oBOwMlS68' },
]

const TOPICS = ['Book a Viewing', 'Property Not Listed', 'Tenancy Issue', 'Other']

const HOURS = [
  { day: 'Monday .. Friday', time: '8:00am .. 6:00pm' },
  { day: 'Saturday',        time: '9:00am .. 4:00pm' },
  { day: 'Sunday',          time: 'Closed'           },
]

export default function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 800)
  }

  return (
    <div className="ct-page">

      {/* ── Hero ── */}
      <div className="ct-hero-stage">
        <div className="ct-hero">
          <img className="ct-hero__bg" src={heroImg} alt="" aria-hidden="true" />
          <div className="ct-hero__vignette" />
          <HeroNav navigate={navigate} page="contact" />
          <div className="ct-hero__content">
            <p className="ct-hero__eyebrow">Get in Touch</p>
            <h1 className="ct-hero__title">We'd Love to<br /><em>Hear From You</em></h1>
            <p className="ct-hero__sub">
              Reach us on any channel we're active on business days, Saturdays inclusive.
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <Reveal>
      <div className="ct-body">
        <div className="ct-body__inner">

          {/* ── Left: Info ── */}
          <div className="ct-info">
            <p className="ct-info__eyebrow">Connect With Us</p>
            <h2 className="ct-info__title">Choose your channel</h2>
            <p className="ct-info__sub">
              Book a viewing, ask about a listing, or find out more about our
              process .. we're here to help.
            </p>

            <div className="ct-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="ct-social"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="ct-social__icon" style={{ background: s.bg, color: s.color }}>
                    {s.svg}
                  </div>
                  <div className="ct-social__text">
                    <div className="ct-social__label">{s.label}</div>
                    <div className="ct-social__handle">{s.handle}</div>
                  </div>
                  <ArrowRight size={14} strokeWidth={2} className="ct-social__arrow" />
                </a>
              ))}
            </div>

            <div className="ct-hours">
              <div className="ct-hours__head">
                <Clock size={13} strokeWidth={2} />
                <span className="ct-hours__label">Office Hours</span>
              </div>
              {HOURS.map((h) => (
                <div key={h.day} className="ct-hours__row">
                  <span>{h.day}</span>
                  <span className={h.time === 'Closed' ? 'ct-hours__closed' : ''}>{h.time}</span>
                </div>
              ))}
              <div className="ct-hours__address">
                <MapPin size={11} strokeWidth={2} />
                Plot 4B, Wuse Zone 6, Abuja, FCT
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="ct-form-card">
            {sent ? (
              <div className="ct-success">
                <div className="ct-success__icon">✓</div>
                <h3 className="ct-success__title">Message Sent!</h3>
                <p className="ct-success__body">
                  Thank you for reaching out. One of our agents will get back to you within 2..4 business hours.
                </p>
                <button className="ct-submit" onClick={() => setSent(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 className="ct-form-card__title">Send a Message</h3>
                <p className="ct-form-card__sub">Fill in the form and we'll respond as quickly as possible.</p>

                <form className="ct-form" onSubmit={handleSubmit}>
                  <div className="ct-form__grid">
                    <div className="ct-field">
                      <label className="ct-label">Full Name *</label>
                      <input className="ct-input" type="text" placeholder="e.g. Emeka Okonkwo" value={form.name} onChange={set('name')} required />
                    </div>
                    <div className="ct-field">
                      <label className="ct-label">Email Address *</label>
                      <input className="ct-input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
                    </div>
                  </div>

                  <div className="ct-form__grid">
                    <div className="ct-field">
                      <label className="ct-label">Phone Number</label>
                      <input className="ct-input" type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={set('phone')} />
                    </div>
                    <div className="ct-field">
                      <label className="ct-label">Topic *</label>
                      <select className="ct-input ct-select" value={form.topic} onChange={set('topic')} required>
                        <option value="">Select a topic…</option>
                        {TOPICS.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="ct-field">
                    <label className="ct-label">Your Message *</label>
                    <textarea className="ct-input ct-textarea" placeholder="Tell us about the property you're looking for, or describe your enquiry…" value={form.message} onChange={set('message')} required rows={5} />
                  </div>

                  <button type="submit" className="ct-submit" disabled={loading}>
                    {loading ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
      </Reveal>

    </div>
  )
}
