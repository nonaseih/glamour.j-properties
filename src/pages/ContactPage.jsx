import { useState } from 'react'
import { WA_BASE } from '../data'

const SOCIALS = [
  {
    label: 'WhatsApp',
    handle: '+234 802 000 0001',
    color: '#25d366',
    href: WA_BASE + '?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20property.',
    icon: 'WA',
  },
  {
    label: 'Instagram',
    handle: '@jaygproperties',
    color: '#e1306c',
    href: '#',
    icon: 'IG',
  },
  {
    label: 'Facebook',
    handle: 'Jay G Properties & Rentals',
    color: '#1877f2',
    href: '#',
    icon: 'FB',
  },
  {
    label: 'X (Twitter)',
    handle: '@jaygproperties',
    color: '#000',
    href: '#',
    icon: 'X',
  },
  {
    label: 'TikTok',
    handle: '@jaygproperties',
    color: '#010101',
    href: '#',
    icon: 'TT',
  },
]

const TOPICS = ['General Enquiry', 'Book a Viewing', 'Property Not Listed', 'Tenancy Issue', 'Other']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="label label--light">Get in Touch</p>
          <h1>We'd Love to Hear From You</h1>
          <p>Reach us on any channel — we respond within a few hours on business days.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* ── Left: Info + Socials ── */}
            <div className="contact-info">
              <h3 className="contact-info__title">Connect With Us</h3>
              <p>
                Whether you want to book a viewing, ask about a listing, or simply find out more about
                our process — we're here to help. Choose the channel that works best for you.
              </p>

              <div className="social-links">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      className="social-link__icon"
                      style={{ background: s.color + '18', color: s.color }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{s.label}</div>
                      <div style={{ fontFamily: 'var(--font-body)', textTransform: 'none', letterSpacing: 0, fontSize: '0.82rem', color: 'var(--ink-muted)', fontWeight: 400 }}>
                        {s.handle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--paper-2)', borderRadius: 'var(--radius-md)' }}>
                <div className="label" style={{ marginBottom: '0.75rem' }}>Office Hours</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Monday – Friday</span><span style={{ color: 'var(--ink)', fontWeight: 500 }}>8:00am – 6:00pm</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Saturday</span><span style={{ color: 'var(--ink)', fontWeight: 500 }}>9:00am – 4:00pm</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Sunday</span><span style={{ color: 'var(--ink)', fontWeight: 500 }}>Closed</span>
                  </div>
                </div>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--paper-3)', fontSize: '0.88rem', color: 'var(--ink-muted)' }}>
                  📍 Plot 4B, Wuse Zone 6, Abuja, FCT
                </div>
              </div>
            </div>

            {/* ── Right: Contact Form ── */}
            <div className="contact-form-card">
              {sent ? (
                <div className="success-state">
                  <div className="success-state__icon">✓</div>
                  <h2>Message Sent!</h2>
                  <p>
                    Thank you for reaching out. One of our agents will get back to you
                    within 2–4 business hours.
                  </p>
                  <button className="btn btn-primary" onClick={() => setSent(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="contact-form__title">Send a Message</div>
                  <p className="contact-form__sub">
                    Fill in the form and we'll respond as quickly as possible.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="contact-form__grid" style={{ marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          className="form-input"
                          type="text"
                          placeholder="e.g. Emeka Okonkwo"
                          value={form.name}
                          onChange={set('name')}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input
                          className="form-input"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={set('email')}
                          required
                        />
                      </div>
                    </div>

                    <div className="contact-form__grid" style={{ marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                          className="form-input"
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={form.phone}
                          onChange={set('phone')}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Topic *</label>
                        <select
                          className="form-select"
                          value={form.topic}
                          onChange={set('topic')}
                          required
                        >
                          <option value="">Select a topic…</option>
                          {TOPICS.map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="form-label">Your Message *</label>
                      <textarea
                        className="form-textarea"
                        placeholder="Tell us about the property you're looking for, or describe your enquiry…"
                        value={form.message}
                        onChange={set('message')}
                        required
                        style={{ minHeight: 140 }}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
