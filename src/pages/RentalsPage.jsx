import { useState, useMemo } from 'react'
import PropertyCard from '../components/PropertyCard'
import { properties, formatPrice, WA_BASE } from '../data'

const TYPES = ['Apartment', 'Duplex', 'Bungalow', 'Villa', 'Semi-Detached', 'Mansion']
const DISTRICTS = ['Maitama', 'Asokoro', 'Jahi', 'Wuse 2', 'Gwarinpa', 'Garki']
const BEDS = ['1', '2', '3', '4', '5+']
const AMENITIES_LIST = ['Swimming Pool', 'CCTV', 'Backup Generator', 'Boys Quarters', 'Smart Home', 'Security']

const DEFAULT_FILTERS = {
  types: [],
  districts: [],
  beds: [],
  maxPrice: 50,
  availability: 'all',
  amenities: [],
}

function toggleArr(arr, val) {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]
}

function PropertyModal({ property, onClose, navigate }) {
  if (!property) return null
  const { title, location, bedrooms, bathrooms, toilets, parking, sqm,
    price, status, description, amenities, annualRent, cautionFee, agencyFee, legalFee } = property

  const waHref = `${WA_BASE}?text=Hi%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(title)}%20in%20${encodeURIComponent(location)}.`

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal__close" onClick={onClose} style={{ float: 'right' }}>✕</button>

        <div className="modal__img img-placeholder" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <span>{title}</span>
        </div>

        <div className="modal__body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="modal__price">
                {formatPrice(price)}
                <span className="modal__price-period"> / year</span>
              </div>
              <p className="modal__title">{title}</p>
              <p className="modal__location">📍 {location}</p>
            </div>
            <span className={`badge ${status === 'available' ? 'badge-available' : status === 'rented' ? 'badge-rented' : 'badge-pending'}`}
              style={{ alignSelf: 'flex-start', fontSize: '0.78rem' }}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>

          <div className="modal__features">
            <span className="modal__feature">🛏 {bedrooms} Bedrooms</span>
            <span className="modal__feature">🚿 {bathrooms} Bathrooms</span>
            <span className="modal__feature">🚽 {toilets} Toilets</span>
            <span className="modal__feature">🚗 {parking} Parking</span>
            <span className="modal__feature">📐 {sqm} sqm</span>
          </div>

          <p className="modal__section-title">About this Property</p>
          <p className="modal__description">{description}</p>

          <p className="modal__section-title">Amenities & Features</p>
          <div className="modal__amenities">
            {amenities.map((a) => (
              <div key={a} className="modal__amenity">{a}</div>
            ))}
          </div>

          <p className="modal__section-title">Cost Breakdown</p>
          <div className="modal__costs">
            <div className="modal__cost-row">
              <span>Annual Rent</span>
              <span>{formatPrice(annualRent)}</span>
            </div>
            <div className="modal__cost-row">
              <span>Caution Deposit (refundable)</span>
              <span>{formatPrice(cautionFee)}</span>
            </div>
            <div className="modal__cost-row">
              <span>Agency Fee (5%)</span>
              <span>{formatPrice(agencyFee)}</span>
            </div>
            <div className="modal__cost-row">
              <span>Legal / Agreement Fee (2.5%)</span>
              <span>{formatPrice(legalFee)}</span>
            </div>
            <div className="modal__cost-row modal__cost-total">
              <span>Total Due on Move-In</span>
              <span>{formatPrice(annualRent + cautionFee + agencyFee + legalFee)}</span>
            </div>
          </div>

          <div className="modal__actions">
            {status === 'available' && (
              <button className="btn btn-primary" onClick={() => { onClose(); navigate('apply') }}>
                Apply to Rent
              </button>
            )}
            <a href={waHref} className="btn btn-outline-accent" target="_blank" rel="noopener noreferrer">
              WhatsApp Agent
            </a>
            <button className="btn btn-outline" onClick={() => { onClose(); navigate('contact') }}>
              Book a Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RentalsPage({ navigate }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState('default')
  const [selected, setSelected] = useState(null)

  const set = (key, val) => setFilters((f) => ({ ...f, [key]: val }))
  const toggleType = (t) => set('types', toggleArr(filters.types, t))
  const toggleDistrict = (d) => set('districts', toggleArr(filters.districts, d))
  const toggleBed = (b) => set('beds', toggleArr(filters.beds, b))
  const toggleAmenity = (a) => set('amenities', toggleArr(filters.amenities, a))

  const filtered = useMemo(() => {
    let list = [...properties]

    if (filters.types.length)
      list = list.filter((p) => filters.types.includes(p.type))
    if (filters.districts.length)
      list = list.filter((p) => filters.districts.some((d) => p.district === d))
    if (filters.beds.length)
      list = list.filter((p) => {
        return filters.beds.some((b) => b === '5+' ? p.bedrooms >= 5 : p.bedrooms === parseInt(b))
      })
    if (filters.availability !== 'all')
      list = list.filter((p) => p.status === filters.availability)
    if (filters.amenities.length)
      list = list.filter((p) => filters.amenities.every((a) => p.amenities.includes(a)))

    const maxPriceVal = filters.maxPrice * 1_000_000
    list = list.filter((p) => p.price <= maxPriceVal)

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'beds-desc') list.sort((a, b) => b.bedrooms - a.bedrooms)

    return list
  }, [filters, sort])

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="label label--light">Properties</p>
          <h1>Browse All Rentals</h1>
          <p>Quality-inspected homes across Abuja's most sought-after districts.</p>
        </div>
      </div>

      <section className="section--sm">
        <div className="container">
          <div className="rentals-layout">
            {/* ── Filter Sidebar ── */}
            <aside className="filter-sidebar">
              <div className="filter-sidebar__title">
                <span>Filters</span>
                <button className="filter-sidebar__reset btn-ghost" onClick={resetFilters}>Reset</button>
              </div>

              <div className="filter-group">
                <div className="filter-group__label">Property Type</div>
                <div className="filter-chips">
                  {TYPES.map((t) => (
                    <button
                      key={t}
                      className={`filter-chip${filters.types.includes(t) ? ' filter-chip--active' : ''}`}
                      onClick={() => toggleType(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-group__label">District</div>
                <div className="filter-chips">
                  {DISTRICTS.map((d) => (
                    <button
                      key={d}
                      className={`filter-chip${filters.districts.includes(d) ? ' filter-chip--active' : ''}`}
                      onClick={() => toggleDistrict(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-group__label">Max Price / Year</div>
                <input
                  type="range"
                  className="filter-range"
                  min={5}
                  max={50}
                  step={2.5}
                  value={filters.maxPrice}
                  onChange={(e) => set('maxPrice', Number(e.target.value))}
                />
                <div className="filter-range-vals">
                  <span>₦5M</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                    {filters.maxPrice >= 50 ? 'Any' : `₦${filters.maxPrice}M`}
                  </span>
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-group__label">Bedrooms</div>
                <div className="filter-chips">
                  {BEDS.map((b) => (
                    <button
                      key={b}
                      className={`filter-chip${filters.beds.includes(b) ? ' filter-chip--active' : ''}`}
                      onClick={() => toggleBed(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-group__label">Availability</div>
                <div className="filter-chips">
                  {[['all', 'All'], ['available', 'Available'], ['pending', 'Pending']].map(([val, label]) => (
                    <button
                      key={val}
                      className={`filter-chip${filters.availability === val ? ' filter-chip--active' : ''}`}
                      onClick={() => set('availability', val)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-group__label">Amenities</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {AMENITIES_LIST.map((a) => (
                    <label key={a} className="filter-check">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(a)}
                        onChange={() => toggleAmenity(a)}
                      />
                      {a}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── Listings ── */}
            <div>
              <div className="rentals-toolbar">
                <span className="rentals-count">
                  {filtered.length} propert{filtered.length === 1 ? 'y' : 'ies'} found
                </span>
                <select
                  className="form-select rentals-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="beds-desc">Most Bedrooms</option>
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state__icon">🏘</div>
                  <h3>No properties match your filters</h3>
                  <p>Try adjusting your search criteria or <button className="btn-ghost" onClick={resetFilters} style={{ color: 'var(--accent)', fontSize: 'inherit', fontFamily: 'inherit' }}>reset all filters</button>.</p>
                </div>
              ) : (
                <div className="rentals-grid">
                  {filtered.map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      navigate={navigate}
                      onViewDetails={setSelected}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tour CTA ── */}
      <section className="cta-banner">
        <div className="container">
          <p className="label label--light" style={{ marginBottom: '0.75rem' }}>Can't Find What You Need?</p>
          <h2>Tell Us What You're Looking For</h2>
          <p>We often have unlisted properties. Describe your ideal home and we'll search our full network.</p>
          <div className="cta-banner__actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('contact')}>
              Talk to an Agent
            </button>
          </div>
        </div>
      </section>

      {selected && (
        <PropertyModal
          property={selected}
          onClose={() => setSelected(null)}
          navigate={navigate}
        />
      )}
    </>
  )
}
