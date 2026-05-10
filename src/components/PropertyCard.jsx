import { useState } from 'react'
import { Home } from 'lucide-react'
import { formatPrice, WA_BASE } from '../data'

const STATUS_CLASS = { available: 'rl-pc__badge--available', pending: 'rl-pc__badge--pending', rented: 'rl-pc__badge--rented' }
const STATUS_LABEL = { available: '● Available', pending: '◌ Pending', rented: '○ Rented' }

export default function PropertyCard({ property, onViewDetails }) {
  const { title, location, bedrooms, bathrooms, parking, price, priceNote, status, featured } = property
  const [faved, setFaved] = useState(false)

  const waHref = `${WA_BASE}?text=${encodeURIComponent(`Hi, I'm interested in the ${title} in ${location}.`)}`

  return (
    <div className="rl-pc" onClick={() => onViewDetails?.(property)}>

      {/* Image area */}
      <div className="rl-pc__img">
        <Home size={48} strokeWidth={0.8} className="rl-pc__placeholder-icon" />
        <span className={`rl-pc__badge ${STATUS_CLASS[status] ?? ''}`}>{STATUS_LABEL[status]}</span>
        {featured && <span className="rl-pc__badge rl-pc__badge--feat">★ Featured</span>}
        <button
          className={`rl-pc__fav${faved ? ' rl-pc__fav--on' : ''}`}
          onClick={(e) => { e.stopPropagation(); setFaved((f) => !f) }}
          aria-pressed={faved}
          aria-label={faved ? 'Remove from favorites' : 'Add to favorites'}
        >
          {faved ? '♥' : '♡'}
        </button>
      </div>

      {/* Body */}
      <div className="rl-pc__body">
        <div className="rl-pc__top">
          <div className="rl-pc__title-col">
            <div className="rl-pc__title">{title}</div>
            <div className="rl-pc__loc">📍 {location}</div>
          </div>
          <div className="rl-pc__price-col">
            <div className="rl-pc__price">{formatPrice(price)}</div>
            <div className="rl-pc__period">{priceNote ?? '/year'}</div>
          </div>
        </div>

        <div className="rl-pc__divider" />

        <div className="rl-pc__feats">
          <span>🛏 {bedrooms} Bed{bedrooms !== 1 ? 's' : ''}</span>
          <span>🚿 {bathrooms} Bath{bathrooms !== 1 ? 's' : ''}</span>
          <span>🚗 {parking} Park</span>
        </div>

        <div className="rl-pc__actions">
          <button
            className="rl-pc__btn rl-pc__btn--outline"
            onClick={(e) => { e.stopPropagation(); onViewDetails?.(property) }}
          >
            View Details
          </button>
          {status === 'available' && (
            <a
              href={waHref}
              className="rl-pc__btn rl-pc__btn--enquire"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Enquire
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
