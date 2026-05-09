import { ArrowLeft, Bed, Bath, Car, Maximize2, MapPin } from 'lucide-react'
import { properties, formatPrice, WA_BASE } from '../data'

export default function PropertyDetailPage({ navigate, propertyId, fromPage }) {
  const property = properties.find((p) => p.id === propertyId) ?? properties[0]

  return (
    <div className="propdetail">

      {/* Fixed back button */}
      <button
        className="propdetail__back"
        onClick={() => navigate(fromPage || 'rentals')}
        aria-label="Go back"
      >
        <ArrowLeft size={15} strokeWidth={2} />
        <span>Back</span>
      </button>

      {/* Hero placeholder */}
      <div className="propdetail__hero">
        <div className="propdetail__hero-placeholder">
          <span>Property Photos Coming Soon</span>
        </div>
        <div className="propdetail__hero-meta">
          <span className={`propdetail__status propdetail__status--${property.status}`}>
            {property.status === 'available' ? 'Available' : 'Pending'}
          </span>
          <span className="propdetail__type">{property.type}</span>
        </div>
      </div>

      {/* Body */}
      <div className="propdetail__body">

        {/* Main column */}
        <div className="propdetail__main">
          <div className="propdetail__location">
            <MapPin size={13} strokeWidth={1.5} />
            {property.location}
          </div>

          <h1 className="propdetail__title">{property.title}</h1>

          <div className="propdetail__price-row">
            {formatPrice(property.price)}
            <span>/yr</span>
          </div>

          <div className="propdetail__stats">
            <div className="propdetail__stat">
              <Bed size={16} strokeWidth={1.5} />
              {property.bedrooms} Beds
            </div>
            <div className="propdetail__stat">
              <Bath size={16} strokeWidth={1.5} />
              {property.bathrooms} Baths
            </div>
            <div className="propdetail__stat">
              <Car size={16} strokeWidth={1.5} />
              {property.parking} Parking
            </div>
            <div className="propdetail__stat">
              <Maximize2 size={16} strokeWidth={1.5} />
              {property.sqm} sqm
            </div>
          </div>

          <p className="propdetail__desc">{property.description}</p>

          <div className="propdetail__amenities">
            <h3>Amenities</h3>
            <div className="propdetail__amenity-grid">
              {property.amenities.map((a) => (
                <span key={a} className="propdetail__amenity">{a}</span>
              ))}
            </div>
          </div>

          <div className="propdetail__fees">
            <h3>Fee Breakdown</h3>
            <div className="propdetail__fee-list">
              <div className="propdetail__fee-row">
                <span>Annual Rent</span>
                <span>{formatPrice(property.annualRent)}</span>
              </div>
              <div className="propdetail__fee-row">
                <span>Caution Deposit</span>
                <span>{formatPrice(property.cautionFee)}</span>
              </div>
              <div className="propdetail__fee-row">
                <span>Agency Fee</span>
                <span>{formatPrice(property.agencyFee)}</span>
              </div>
              <div className="propdetail__fee-row">
                <span>Legal Fee</span>
                <span>{formatPrice(property.legalFee)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="propdetail__sidebar">
          <div className="propdetail__card">
            <div className="propdetail__card-price">
              {formatPrice(property.price)}
              <span>/yr</span>
            </div>
            <p className="propdetail__card-label">Annual rent · excl. fees</p>

            <button
              className="propdetail__apply-btn"
              onClick={() => navigate('apply')}
            >
              Apply to Rent
            </button>

            <a
              href={`${WA_BASE}?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(property.title)}%20in%20${encodeURIComponent(property.location)}.`}
              className="propdetail__wa-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>

            <button
              className="propdetail__contact-btn"
              onClick={() => navigate('contact')}
            >
              Contact an Agent
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
