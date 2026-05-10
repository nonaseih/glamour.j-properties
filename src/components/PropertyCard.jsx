import { useState, useRef, useEffect } from 'react'
import { Home, MapPin, Bed, Bath, Car } from 'lucide-react'
import { formatPrice, WA_BASE } from '../data'
import { PROPERTY_VIDEOS } from '../propertyVideos'

export default function PropertyCard({ property, onViewDetails }) {
  const { title, location, bedrooms, bathrooms, parking, price, priceNote, status, featured } = property
  const [faved, setFaved] = useState(false)
  const video = PROPERTY_VIDEOS[property.id] ?? null
  const videoRef = useRef(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const waHref = `${WA_BASE}?text=${encodeURIComponent(`Hi, I'm interested in the ${title} in ${location}.`)}`

  return (
    <div className="rl-pc" onClick={() => onViewDetails?.(property)}>

      {/* Image / video area */}
      <div className="rl-pc__img">
        {video
          ? <video ref={videoRef} src={video} className="rl-pc__video" autoPlay muted loop playsInline preload="metadata" />
          : <Home size={48} strokeWidth={0.8} className="rl-pc__placeholder-icon" />
        }
        {featured && <span className="rl-pc__badge rl-pc__badge--feat" style={{ zIndex: 2, position: 'relative' }}>★ Featured</span>}
        <button
          style={{ zIndex: 2, position: 'relative' }}
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
            <div className="rl-pc__loc"><MapPin size={11} strokeWidth={1.5} />{location}</div>
          </div>
          <div className="rl-pc__price-col">
            <div className="rl-pc__price">{formatPrice(price)}</div>
            <div className="rl-pc__period">{priceNote ?? '/year'}</div>
          </div>
        </div>

        <div className="rl-pc__divider" />

        <div className="rl-pc__feats">
          <span><Bed size={12} strokeWidth={1.5} /> {bedrooms} Bed{bedrooms !== 1 ? 's' : ''}</span>
          <span><Bath size={12} strokeWidth={1.5} /> {bathrooms} Bath{bathrooms !== 1 ? 's' : ''}</span>
          <span><Car size={12} strokeWidth={1.5} /> {parking} Park</span>
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
