import { useState } from 'react'
import { faqs, WA_BASE } from '../data'
import HeroNav from '../components/HeroNav'
import Reveal from '../components/Reveal'
import heroImg from '../assets/JAY hero image.jpg'

const CATEGORIES = ['All', 'Process', 'Costs', 'Requirements', 'Tenancy']

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`fq-item${open ? ' fq-item--open' : ''}`}>
      <button
        className="fq-item__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="fq-item__num">{String(index + 1).padStart(2, '0')}</span>
        <span className="fq-item__q">{faq.q}</span>
        <span className="fq-item__toggle">
          <ChevronIcon />
        </span>
      </button>
      <div className="fq-item__body">
        <div className="fq-item__body-inner">
          <p className="fq-item__a">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQPage({ navigate }) {
  const [category, setCategory] = useState('All')

  const filtered = category === 'All' ? faqs : faqs.filter((f) => f.category === category)

  const waHref = `${WA_BASE}?text=Hi%2C%20I%20have%20a%20question%20about%20renting%20through%20Jay%20G%20Properties.`

  return (
    <div className="fq-page">

      {/* ── Hero ── */}
      <div className="fq-hero-stage">
        <div className="fq-hero">
          <img className="fq-hero__bg" src={heroImg} alt="" aria-hidden="true" />
          <div className="fq-hero__vignette" />
          <HeroNav navigate={navigate} page="faq" />
          <div className="fq-hero__content">
            <p className="fq-hero__eyebrow">Help Centre</p>
            <h1 className="fq-hero__title">Frequently Asked<br />Questions</h1>
            <p className="fq-hero__sub">
              Everything you need to know about renting through Jay G Properties &amp; Rentals.
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="fq-filterbar">
        <div className="fq-filterbar__inner">
          {CATEGORIES.map((c) => {
            const count = c === 'All' ? faqs.length : faqs.filter((f) => f.category === c).length
            return (
              <button
                key={c}
                className={`fq-chip${category === c ? ' fq-chip--active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
                <span className="fq-chip__count">{count}</span>
              </button>
            )
          })}
          <span className="fq-filterbar__tally">
            {filtered.length} answer{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Accordion ── */}
      <Reveal>
        <main className="fq-main">
          <div className="fq-main__inner">
            <div className="fq-list">
              {filtered.map((f, i) => (
                <FAQItem key={f.id} faq={f} index={i} />
              ))}
            </div>
          </div>
        </main>
      </Reveal>

      {/* ── Bottom CTA ── */}
      <Reveal delay={80}>
      <div className="fq-cta">
        <div className="fq-cta__inner">
          <div className="fq-cta__text">
            <h3 className="fq-cta__title">Still have questions?</h3>
            <p className="fq-cta__sub">Our agents reply within the hour on WhatsApp.</p>
          </div>
          <div className="fq-cta__actions">
            <a
              href={waHref}
              className="fq-btn fq-btn--wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.533 5.854L.057 23.882a.5.5 0 0 0 .61.61l6.088-1.467A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.876 0-3.637-.49-5.164-1.349l-.36-.21-3.814.919.938-3.742-.228-.374A9.963 9.963 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <button className="fq-btn fq-btn--ghost" onClick={() => navigate('contact')}>
              Send a Message
            </button>
          </div>
        </div>
      </div>
      </Reveal>

    </div>
  )
}
