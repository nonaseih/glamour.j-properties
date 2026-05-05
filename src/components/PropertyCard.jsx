import { formatPrice, WA_BASE } from '../data'

const BED_ICON = '🛏'
const BATH_ICON = '🚿'
const PARK_ICON = '🚗'
const PIN_ICON = '📍'

const STATUS_BADGE = {
  available: 'badge-available',
  rented: 'badge-rented',
  pending: 'badge-pending',
}

const STATUS_LABEL = {
  available: 'Available',
  rented: 'Rented',
  pending: 'Pending',
}

export default function PropertyCard({ property, onViewDetails, navigate }) {
  const { title, location, bedrooms, bathrooms, parking, price, status, featured } = property

  const waHref = `${WA_BASE}?text=Hi%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(title)}%20in%20${encodeURIComponent(location)}.`

  return (
    <div className="prop-card">
      <div className="prop-card__img img-placeholder">
        <div className={`prop-card__badge badge ${STATUS_BADGE[status]}`}>
          {STATUS_LABEL[status]}
        </div>
        {featured && (
          <div style={{ position: 'absolute', top: '0.75rem', right: '2.75rem' }}>
            <span className="badge badge-featured">Featured</span>
          </div>
        )}
        <span>{title}</span>
      </div>

      <div className="prop-card__body">
        <div className="prop-card__price">
          {formatPrice(price)}
          <span className="prop-card__price-period"> / year</span>
        </div>
        <p className="prop-card__title">{title}</p>
        <p className="prop-card__location">
          <span style={{ fontSize: '0.8rem' }}>{PIN_ICON}</span>
          {location}
        </p>

        <div className="prop-card__divider" />

        <div className="prop-card__features">
          <span className="prop-card__feature">
            {BED_ICON} {bedrooms} Bed{bedrooms !== 1 ? 's' : ''}
          </span>
          <span className="prop-card__feature">
            {BATH_ICON} {bathrooms} Bath{bathrooms !== 1 ? 's' : ''}
          </span>
          <span className="prop-card__feature">
            {PARK_ICON} {parking} Park
          </span>
        </div>

        <div className="prop-card__actions">
          <button
            className="btn btn-outline-accent btn-sm"
            onClick={() => onViewDetails && onViewDetails(property)}
          >
            View Details
          </button>
          {status === 'available' && (
            <a
              href={waHref}
              className="btn btn-primary btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
