import { useState } from 'react'
import { faqs } from '../data'

const CATEGORIES = ['All', 'Process', 'Costs', 'Requirements', 'Tenancy']

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen((v) => !v)}>
        <span>{faq.q}</span>
        <span className="faq-item__icon">+</span>
      </button>
      {open && <div className="faq-item__a">{faq.a}</div>}
    </div>
  )
}

export default function FAQPage({ navigate }) {
  const [category, setCategory] = useState('All')

  const filtered = category === 'All' ? faqs : faqs.filter((f) => f.category === category)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="label label--light">Help Centre</p>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about renting through Jay. G Properties & Rentals.</p>
        </div>
      </div>

      <section className="section">
        <div className="container container--narrow">
          <div className="faq-tabs">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`faq-tab${category === c ? ' faq-tab--active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
                <span style={{ marginLeft: '0.4rem', opacity: 0.65 }}>
                  ({c === 'All' ? faqs.length : faqs.filter((f) => f.category === c).length})
                </span>
              </button>
            ))}
          </div>

          <div className="faq-list">
            {filtered.map((f) => (
              <FAQItem key={f.id} faq={f} />
            ))}
          </div>

          <div className="faq-contact">
            <h3>Still Have Questions?</h3>
            <p>
              Our team is happy to help. Reach out on WhatsApp for the fastest response,
              or send us a message and we'll get back to you within a few hours.
            </p>
            <div className="faq-contact__actions">
              <a
                href="https://wa.me/2348020000001?text=Hi%2C%20I%20have%20a%20question%20about%20renting."
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
              <button className="btn btn-outline" onClick={() => navigate('contact')}>
                Send a Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
