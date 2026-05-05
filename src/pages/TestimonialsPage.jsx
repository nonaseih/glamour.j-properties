import { testimonials } from '../data'

function Stars({ count }) {
  return (
    <div className="review-card__stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < count ? '#f5a623' : 'var(--paper-3)' }}>★</span>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <Stars count={review.rating} />
      <p className="review-card__quote">"{review.quote}"</p>
      <div className="review-card__author">
        <div className="review-card__avatar">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="review-card__name">{review.name}</div>
          <div className="review-card__detail">{review.detail}</div>
        </div>
      </div>
    </div>
  )
}

const PLATFORMS = [
  { name: 'Google', score: '4.9', reviews: '87' },
  { name: 'Facebook', score: '4.8', reviews: '54' },
  { name: 'Nairaland', score: '4.9', reviews: '41' },
]

export default function TestimonialsPage({ navigate }) {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="label label--light">Client Stories</p>
          <h1>What Our Tenants Say</h1>
          <p>Hundreds of families have found their home through Jay. G Properties. Here's what a few of them have to say.</p>
        </div>
      </div>

      {/* ── Ratings Summary ── */}
      <div className="testimonials-summary">
        <div className="container">
          <div className="testimonials-summary__inner">
            <div>
              <div className="testimonials-summary__score">4.9</div>
              <div className="testimonials-summary__stars">
                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <div className="testimonials-summary__label">Average Rating · 182 Reviews</div>
            </div>

            <div style={{ width: '1px', background: 'rgba(255,255,255,.08)', alignSelf: 'stretch' }} />

            <div className="testimonials-summary__platforms">
              {PLATFORMS.map((p) => (
                <div key={p.name} className="testimonials-summary__platform">
                  <div className="testimonials-summary__platform-name">{p.name}</div>
                  <div className="testimonials-summary__platform-score">{p.score} ★</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'rgba(255,255,255,.3)', marginTop: '0.2rem' }}>
                    {p.reviews} reviews
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                98%
              </div>
              <div className="testimonials-summary__label" style={{ marginTop: '0.35rem' }}>
                Would Recommend Us
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Review Grid ── */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {testimonials.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Leave a Review Banner ── */}
      <section style={{ background: 'var(--paper-2)', paddingBlock: '4rem' }}>
        <div className="container container--narrow text-center">
          <p className="label" style={{ marginBottom: '0.75rem' }}>Share Your Experience</p>
          <h2>Rented Through Us? We'd Love Your Review</h2>
          <p style={{ color: 'var(--ink-muted)', margin: '1rem auto 2rem', maxWidth: 460 }}>
            Your honest feedback helps other tenants make informed decisions — and helps us keep improving.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#"
              className="btn btn-primary btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Review on Google
            </a>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('contact')}>
              Send Us Feedback
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
