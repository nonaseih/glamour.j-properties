import { useState, useRef, useEffect, useCallback } from 'react'
import { Pen, Check, X, ClipboardList, Phone, BadgeCheck } from 'lucide-react'
import { testimonials, reviewStats } from '../data'
import HeroNav from '../components/HeroNav'
import Reveal from '../components/Reveal'
import heroImg from '../assets/JAY hero image.jpg'

// ── Avatar color palette ──
const AVATAR_COLORS = ['#8B4513', '#C06240', '#6B5B45', '#2D7A4F', '#1B4B72', '#7B3F00', '#5C3A6E']
function nameColor(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length]
}

function Stars({ count, size = 14 }) {
  return (
    <div className="rv-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < count ? '#f5a623' : 'rgba(0,0,0,0.12)', fontSize: size }}>★</span>
      ))}
    </div>
  )
}

function StarsLight({ count, size = 14 }) {
  return (
    <div className="rv-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < count ? '#f5a623' : 'rgba(255,255,255,0.15)', fontSize: size }}>★</span>
      ))}
    </div>
  )
}

function VerifyBadge() {
  return (
    <span className="rv-verify-badge">
      <Check size={9} strokeWidth={3} />
      Verified Tenant
    </span>
  )
}

function Avatar({ name, size = 40 }) {
  return (
    <div
      className="rv-avatar"
      style={{ width: size, height: size, minWidth: size, background: nameColor(name), fontSize: Math.round(size * 0.38) }}
    >
      {name.charAt(0)}
    </div>
  )
}

function RegularCard({ review }) {
  return (
    <div className="rv-card">
      <div className="rv-card__top">
        <Stars count={review.rating} />
        {review.verified && <VerifyBadge />}
      </div>
      <p className="rv-card__quote">"{review.quote}"</p>
      <div className="rv-card__author">
        <Avatar name={review.name} size={38} />
        <div className="rv-card__author-info">
          <div className="rv-card__name">{review.name}</div>
          <div className="rv-card__detail">{review.detail}</div>
        </div>
      </div>
    </div>
  )
}

function FeaturedPhotoCard({ review }) {
  return (
    <div className="rv-card rv-card--photo">
      <div className="rv-card__feat-label">Featured Review</div>
      <Stars count={review.rating} size={20} />
      <p className="rv-card__quote rv-card__quote--lg">"{review.quote}"</p>
      <div className="rv-card__author">
        <Avatar name={review.name} size={52} />
        <div className="rv-card__author-info">
          <div className="rv-card__name rv-card__name--lg">{review.name}</div>
          <div className="rv-card__detail">{review.detail}</div>
          {review.verified && <VerifyBadge />}
        </div>
      </div>
    </div>
  )
}

function FeaturedQuoteCard({ review }) {
  return (
    <div className="rv-card rv-card--quote">
      <div className="rv-card__quotemark">"</div>
      <p className="rv-card__pull">{review.quote}</p>
      <div className="rv-card__author">
        <Avatar name={review.name} size={48} />
        <div className="rv-card__author-info">
          <div className="rv-card__name rv-card__name--lg">{review.name}</div>
          <div className="rv-card__detail">{review.detail}</div>
          {review.verified && <VerifyBadge />}
        </div>
      </div>
    </div>
  )
}

function StarRatingInput({ value, onChange }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="rv-star-input">
      {Array.from({ length: 5 }, (_, i) => {
        const n = i + 1
        return (
          <button
            key={n}
            type="button"
            className={`rv-star-input__star${n <= (hover || value) ? ' rv-star-input__star--on' : ''}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(n)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
          >
            ★
          </button>
        )
      })}
    </div>
  )
}

function WriteReviewModal({ open, onClose, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [propType, setPropType] = useState('')
  const [district, setDistrict] = useState('')
  const [loading, setLoading] = useState(false)
  const overlayRef = useRef(null)
  const bodyRef   = useRef(null)
  const barRef    = useRef(null)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const el = bodyRef.current
    if (!el) return
    const update = () => {
      const pct = el.scrollHeight <= el.clientHeight
        ? 100
        : (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }
    el.addEventListener('scroll', update, { passive: true })
    update()
    return () => el.removeEventListener('scroll', update)
  }, [open])

  if (!open) return null

  const valid = rating > 0 && name.trim().length > 1 && text.trim().length > 20

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!valid) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setRating(0); setName(''); setText(''); setPropType(''); setDistrict('')
      onClose()
      onSubmit()
    }, 700)
  }

  return (
    <div
      className="rv-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="rv-modal" role="dialog" aria-modal="true" aria-label="Write a Review">
        <div className="rv-modal__head">
          <h3 className="rv-modal__title">Share Your Experience</h3>
          <button className="rv-modal__close" onClick={onClose} aria-label="Close">
            <X size={16} strokeWidth={2} />
          </button>
        </div>
        <div className="rv-modal__scroll-track">
          <div className="rv-modal__scroll-bar" ref={barRef} />
        </div>
        <div className="rv-modal__body" ref={bodyRef}>
          <form className="rv-form" onSubmit={handleSubmit}>
            <div className="rv-form__field">
              <label className="rv-form__label">Your Rating</label>
              <StarRatingInput value={rating} onChange={setRating} />
            </div>
            <div className="rv-form__field">
              <label className="rv-form__label">Your Name</label>
              <input
                className="rv-form__input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Adaeze N."
                maxLength={60}
                autoComplete="name"
              />
            </div>
            <div className="rv-form__field">
              <label className="rv-form__label">Your Review</label>
              <textarea
                className="rv-form__textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell us about your experience with Jay G Properties..."
                rows={4}
                maxLength={600}
              />
              <div className="rv-form__count">{text.length}/600</div>
            </div>
            <div className="rv-form__row">
              <div className="rv-form__field">
                <label className="rv-form__label">Property Type <span className="rv-form__opt">(optional)</span></label>
                <input
                  className="rv-form__input"
                  type="text"
                  value={propType}
                  onChange={(e) => setPropType(e.target.value)}
                  placeholder="e.g. 3 Bed Duplex"
                  maxLength={40}
                />
              </div>
              <div className="rv-form__field">
                <label className="rv-form__label">District <span className="rv-form__opt">(optional)</span></label>
                <input
                  className="rv-form__input"
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Gwarinpa"
                  maxLength={40}
                />
              </div>
            </div>
            <p className="rv-form__note">
              <Check size={11} strokeWidth={2.5} />
              Submitted reviews are verified by our team before publishing.
            </p>
            <button className="rv-form__submit" type="submit" disabled={!valid || loading}>
              {loading ? 'Submitting…' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function HowWeVerify() {
  const steps = [
    { Icon: ClipboardList, title: 'Tenancy Confirmation', body: 'We check that the reviewer has an active or past tenancy agreement with Jay G Properties.' },
    { Icon: Phone,         title: 'Identity Check',       body: 'Our team contacts the reviewer via the phone number on file to confirm the submission.' },
    { Icon: BadgeCheck,    title: 'Editorial Review',     body: 'Reviews are read for authenticity before publishing. No fake or incentivised reviews, ever.' },
  ]
  return (
    <section className="rv-how">
      <div className="rv-how__inner">
        <div className="rv-how__head">
          <p className="rv-how__label">Transparency</p>
          <h2 className="rv-how__title">How We Verify Reviews</h2>
          <p className="rv-how__sub">Every review on this page comes from a real client. Here's our process.</p>
        </div>
        <div className="rv-how__steps">
          {steps.map((s) => (
            <div key={s.title} className="rv-how__step">
              <div className="rv-how__step-icon"><s.Icon size={22} strokeWidth={1.4} /></div>
              <div className="rv-how__step-title">{s.title}</div>
              <p className="rv-how__step-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Toast({ show }) {
  return (
    <div className={`rv-toast${show ? ' rv-toast--visible' : ''}`} role="status" aria-live="polite">
      <Check size={14} strokeWidth={2.5} />
      Review submitted .. thank you! We'll publish it after verification.
    </div>
  )
}

const SORT_OPTIONS = [
  { value: 'recent',  label: 'Most Recent'  },
  { value: 'helpful', label: 'Most Helpful'  },
  { value: 'rating',  label: 'Highest Rated' },
]

export default function TestimonialsPage({ navigate }) {
  const [ratingFilter, setRatingFilter] = useState(null)
  const [sortBy, setSortBy] = useState('recent')
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState(false)

  const handleSubmit = useCallback(() => {
    setToast(true)
    setTimeout(() => setToast(false), 3500)
  }, [])

  const isFiltered = ratingFilter !== null

  let displayList = [...testimonials]
  if (isFiltered) displayList = displayList.filter((r) => r.rating === ratingFilter)
  if (sortBy === 'recent')  displayList.sort((a, b) => b.date.localeCompare(a.date))
  if (sortBy === 'helpful') displayList.sort((a, b) => (b.helpfulCount ?? 0) - (a.helpfulCount ?? 0))
  if (sortBy === 'rating')  displayList.sort((a, b) => b.rating - a.rating)

  const bentoItems = isFiltered ? displayList : (() => {
    const photo    = testimonials.find((r) => r.featuredVariant === 'photo')
    const quote    = testimonials.find((r) => r.featuredVariant === 'quote')
    const regulars = testimonials.filter((r) => !r.featured)
    return [photo, regulars[0], regulars[1], quote, regulars[2], regulars[3], regulars[4], regulars[5]].filter(Boolean)
  })()

  const renderCard = (review) => {
    if (!isFiltered && review.featuredVariant === 'photo') return <FeaturedPhotoCard key={review.id} review={review} />
    if (!isFiltered && review.featuredVariant === 'quote') return <FeaturedQuoteCard key={review.id} review={review} />
    return <RegularCard key={review.id} review={review} />
  }

  return (
    <div className="rv-page">

      {/* ── Hero ── */}
      <div className="rv-hero-stage">
        <div className="rv-hero">
          <img className="rv-hero__bg" src={heroImg} alt="" aria-hidden="true" />
          <div className="rv-hero__vignette" />
          <HeroNav navigate={navigate} page="testimonials" />
          <div className="rv-hero__content">
            <p className="rv-hero__eyebrow">Client Stories</p>
            <h1 className="rv-hero__title">Tenants<br /><em>Review</em></h1>
            <p className="rv-hero__sub">Hundreds of families have found their home through Jay G Properties.</p>
          </div>
        </div>
      </div>

      {/* ── Rating Band ── */}
      <Reveal>
        <div className="rv-band">
          <div className="rv-band__inner">
            <div className="rv-band__score-wrap">
              <span className="rv-band__score">{reviewStats.avg}</span>
              <div>
                <StarsLight count={Math.round(reviewStats.avg)} size={22} />
                <div className="rv-band__count">{reviewStats.total} verified reviews</div>
              </div>
            </div>
            <div className="rv-band__divider" />
            <div className="rv-band__platforms">
              {[
                { name: 'Google',    score: '4.9' },
                { name: 'Facebook',  score: '4.8' },
                { name: 'Nairaland', score: '4.9' },
              ].map((p) => (
                <div key={p.name} className="rv-band__platform">
                  <div className="rv-band__platform-score">{p.score} ★</div>
                  <div className="rv-band__platform-name">{p.name}</div>
                </div>
              ))}
            </div>
            <div className="rv-band__divider" />
            <div className="rv-band__recommend">
              <div className="rv-band__recommend-pct">98%</div>
              <div className="rv-band__recommend-label">would recommend</div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Filter Bar ── */}
      <div className="rv-filterbar">
        <div className="rv-filterbar__inner">
          <div className="rv-filterbar__chips">
            <span className="rv-filterbar__label">Filter:</span>
            {[5, 4, 3].map((n) => (
              <button
                key={n}
                className={`rv-chip${ratingFilter === n ? ' rv-chip--active' : ''}`}
                onClick={() => setRatingFilter(ratingFilter === n ? null : n)}
              >
                {'★'.repeat(n)} {n}{n < 5 ? '+' : ''}
              </button>
            ))}
            {isFiltered && (
              <button className="rv-chip rv-chip--clear" onClick={() => setRatingFilter(null)}>
                <X size={10} strokeWidth={2.5} /> Clear
              </button>
            )}
          </div>
          <select className="rv-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Reviews Bento Grid ── */}
      <Reveal delay={60}>
        <section className="rv-section">
          <div className="rv-section__inner">
            {bentoItems.length > 0 ? (
              <div className={`rv-bento${isFiltered ? ' rv-bento--flat' : ''}`}>
                {bentoItems.map((r) => renderCard(r))}
              </div>
            ) : (
              <div className="rv-empty">No reviews match that filter.</div>
            )}
          </div>
        </section>
      </Reveal>

      {/* ── How We Verify ── */}
      <Reveal delay={120}>
        <HowWeVerify />
      </Reveal>

      {/* ── Sticky FAB ── */}
      <button className="rv-fab" onClick={() => setModalOpen(true)}>
        <Pen size={15} strokeWidth={2} />
        <span>Write a Review</span>
      </button>

      {/* ── Modal ── */}
      <WriteReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* ── Toast ── */}
      <Toast show={toast} />

    </div>
  )
}
