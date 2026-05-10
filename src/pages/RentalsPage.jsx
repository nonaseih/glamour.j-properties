import { useState, useMemo, useRef, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard'
import { properties, formatPrice, WA_BASE } from '../data'
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Check } from 'lucide-react'

const TYPES        = ['Apartment', 'Duplex', 'Bungalow', 'Villa', 'Semi-Detached', 'Mansion', 'Terrace Duplex', 'Smart Mansion']
const DISTRICTS    = ['Maitama', 'Asokoro', 'Jahi', 'Wuse 2', 'Gwarinpa', 'Garki', 'Guzape', 'Katampe']
const BEDS         = ['1', '2', '3', '4', '5+']
const AMENITIES_LIST = ['Swimming Pool', 'CCTV', 'Backup Generator', 'Boys Quarters', 'Smart Home', 'Security']

const DEFAULT_FILTERS = {
  query: '',
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

/* ── Featured Carousel ───────────────────────────────────── */
function FeaturedCarousel({ navigate }) {
  const featured = properties.filter((p) => p.featured)
  const [idx, setIdx] = useState(0)
  const count = featured.length
  if (count === 0) return null

  const visible = Math.min(3, count)
  const cards = Array.from({ length: visible }, (_, i) => featured[(idx + i) % count])

  return (
    <div className="rl-feat">
      <div className="rl-feat__cards">
        {cards.map((prop) => (
          <button
            key={prop.id}
            className="rl-feat-card"
            onClick={() => navigate('property', prop.id)}
          >
            <div className="rl-feat-card__img">
              <span className={`rl-feat-card__status rl-feat-card__status--${prop.status}`}>
                {prop.status === 'available' ? '● Available' : '◌ Pending'}
              </span>
              {prop.featured && (
                <span className="rl-feat-card__star">★ Featured</span>
              )}
            </div>
            <div className="rl-feat-card__body">
              <div className="rl-feat-card__name">{prop.title}</div>
              <div className="rl-feat-card__meta">
                {prop.bedrooms} Bed · {prop.bathrooms} Bath · {prop.parking} Park
              </div>
              <div className="rl-feat-card__foot">
                <div className="rl-feat-card__price">
                  {formatPrice(prop.price)}
                  <span>{prop.priceNote ?? '/yr'}</span>
                </div>
                <span className="rl-feat-card__view">View →</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      {count > visible && (
        <div className="rl-feat__arrows">
          <button
            className="rl-feat__arrow rl-feat__arrow--ghost"
            onClick={() => setIdx((i) => (i - 1 + count) % count)}
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            className="rl-feat__arrow"
            onClick={() => setIdx((i) => (i + 1) % count)}
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  )
}

/* ── Active filter chips (toolbar) ───────────────────────── */
function ActiveChips({ filters, set, resetFilters }) {
  const chips = []
  filters.types.forEach((t)     => chips.push({ label: t,            remove: () => set('types',     filters.types.filter((x) => x !== t)) }))
  filters.districts.forEach((d) => chips.push({ label: d,            remove: () => set('districts', filters.districts.filter((x) => x !== d)) }))
  filters.beds.forEach((b)      => chips.push({ label: `${b} Beds`,  remove: () => set('beds',      filters.beds.filter((x) => x !== b)) }))
  filters.amenities.forEach((a) => chips.push({ label: a,            remove: () => set('amenities', filters.amenities.filter((x) => x !== a)) }))
  if (filters.availability !== 'all') chips.push({ label: filters.availability, remove: () => set('availability', 'all') })
  if (filters.maxPrice < 50)          chips.push({ label: `≤₦${filters.maxPrice}M`, remove: () => set('maxPrice', 50) })
  if (chips.length === 0) return null

  return (
    <div className="rl-active-chips">
      {chips.map((c) => (
        <button key={c.label} className="rl-active-chip" onClick={c.remove}>
          {c.label} <X size={10} strokeWidth={2.5} />
        </button>
      ))}
      <button className="rl-clear-all" onClick={resetFilters}>Clear all</button>
    </div>
  )
}

/* ── Property modal (upgraded) ───────────────────────────── */
function PropertyModal({ property, onClose, navigate }) {
  if (!property) return null
  const {
    title, location, bedrooms, bathrooms, toilets, parking, sqm,
    price, priceNote, status, description, amenities,
    annualRent, cautionFee, agencyFee, legalFee,
  } = property

  const isSale = priceNote?.includes('asking')
  const waHref = `${WA_BASE}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${title} in ${location}. Could you tell me more about availability and viewings?`
  )}`

  return (
    <div className="rl-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rl-modal">
        {/* Header image placeholder */}
        <div className="rl-modal__hero">
          <span className={`rl-modal__status rl-modal__status--${status}`}>
            {status === 'available' ? '● Available' : '◌ Pending'}
          </span>
          <button className="rl-modal__close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="rl-modal__body">

          {/* Price + title */}
          <div className="rl-modal__top">
            <div className="rl-modal__price">
              {formatPrice(price)}
              <span>{priceNote ?? ' / year'}</span>
            </div>
            <div className="rl-modal__title">{title}</div>
            <div className="rl-modal__loc">📍 {location}</div>
          </div>

          {/* Features strip */}
          <div className="rl-modal__features">
            {[
              ['🛏', `${bedrooms} Bedrooms`],
              ['🚿', `${bathrooms} Bathrooms`],
              toilets && ['🚽', `${toilets} Toilets`],
              ['🚗', `${parking} Parking`],
              sqm && ['📐', `${sqm} sqm`],
            ].filter(Boolean).map(([icon, label]) => (
              <span key={label} className="rl-modal__feat">{icon} {label}</span>
            ))}
          </div>

          {/* About */}
          {description && (
            <div className="rl-modal__section">
              <div className="rl-modal__eyebrow">About this Property</div>
              <p className="rl-modal__desc">{description}</p>
            </div>
          )}

          {/* Amenities */}
          {amenities?.length > 0 && (
            <div className="rl-modal__section">
              <div className="rl-modal__eyebrow">Amenities &amp; Features</div>
              <div className="rl-modal__amenities">
                {amenities.map((a) => (
                  <div key={a} className="rl-modal__amenity">
                    <Check size={11} strokeWidth={2.5} className="rl-modal__amenity-check" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cost breakdown */}
          <div className="rl-modal__section">
            <div className="rl-modal__eyebrow">Cost Breakdown</div>
            <div className="rl-modal__costs">
              {[
                [isSale ? 'Sale Price' : 'Annual Rent', annualRent],
                ['Caution Deposit (refundable)', cautionFee],
                ['Agency Fee (5%)', agencyFee],
                ['Legal / Agreement Fee (2.5%)', legalFee],
              ].map(([label, val]) => (
                <div key={label} className="rl-modal__cost-row">
                  <span>{label}</span>
                  <span>{formatPrice(val)}</span>
                </div>
              ))}
              <div className="rl-modal__cost-row rl-modal__cost-total">
                <span>Total Due on Move-In</span>
                <span>{formatPrice((annualRent || 0) + (cautionFee || 0) + (agencyFee || 0) + (legalFee || 0))}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="rl-modal__actions">
            {status === 'available' && (
              <button
                className="rl-modal__btn rl-modal__btn--primary"
                onClick={() => { onClose(); navigate('apply') }}
              >
                Apply to Rent
              </button>
            )}
            <a
              href={waHref}
              className="rl-modal__btn rl-modal__btn--wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 WhatsApp Agent
            </a>
            <button
              className="rl-modal__btn rl-modal__btn--ghost"
              onClick={() => { onClose(); navigate('contact') }}
            >
              Book a Viewing
            </button>
          </div>

          {/* Full detail link */}
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <button
              className="rl-modal__detail-link"
              onClick={() => { onClose(); navigate('property', property.id) }}
            >
              View full property page →
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ── Main page ───────────────────────────────────────────── */
export default function RentalsPage({ navigate }) {
  const [filters, setFilters]     = useState(DEFAULT_FILTERS)
  const [sort, setSort]           = useState('default')
  const [selected, setSelected]   = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [stuck, setStuck]         = useState(false)

  const set = (key, val) => setFilters((f) => ({ ...f, [key]: val }))
  const toggleType     = (t) => set('types',     toggleArr(filters.types, t))
  const toggleDistrict = (d) => set('districts', toggleArr(filters.districts, d))
  const toggleBed      = (b) => set('beds',      toggleArr(filters.beds, b))
  const toggleAmenity  = (a) => set('amenities', toggleArr(filters.amenities, a))
  const resetFilters   = () => { setFilters(DEFAULT_FILTERS); setDrawerOpen(false) }

  /* Sticky filter bar */
  useEffect(() => {
    const sentinel = document.getElementById('rl-sentinel')
    if (!sentinel) return
    const obs = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { threshold: 0 })
    obs.observe(sentinel)
    return () => obs.disconnect()
  }, [])

  const activeCount =
    filters.types.length + filters.districts.length + filters.beds.length +
    filters.amenities.length +
    (filters.availability !== 'all' ? 1 : 0) +
    (filters.maxPrice < 50 ? 1 : 0)

  const filtered = useMemo(() => {
    let list = [...properties]

    if (filters.query) {
      const q = filters.query.toLowerCase()
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.amenities?.some((a) => a.toLowerCase().includes(q))
      )
    }
    if (filters.types.length)
      list = list.filter((p) => filters.types.includes(p.type))
    if (filters.districts.length)
      list = list.filter((p) => filters.districts.some((d) => p.district === d))
    if (filters.beds.length)
      list = list.filter((p) =>
        filters.beds.some((b) => b === '5+' ? p.bedrooms >= 5 : p.bedrooms === parseInt(b))
      )
    if (filters.availability !== 'all')
      list = list.filter((p) => p.status === filters.availability)
    if (filters.amenities.length)
      list = list.filter((p) => filters.amenities.every((a) => p.amenities?.includes(a)))

    list = list.filter((p) => p.price <= filters.maxPrice * 1_000_000)

    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'beds-desc')  list.sort((a, b) => b.bedrooms - a.bedrooms)

    return list
  }, [filters, sort])

  return (
    <div className="rl">

      {/* ── Hero ── */}
      <div className="rl-hero">
        <div className="rl-hero__overlay" />

        <div className="rl-hero__content">
          <div className="rl-hero__eyebrow">
            <span className="rl-hero__eyebrow-dot" />
            Browse Live Listings
          </div>
          <h1 className="rl-hero__h1">
            Quality-inspected<br />
            <em>rentals across</em><br />
            Abuja's best districts.
          </h1>
          <p className="rl-hero__sub">
            From furnished apartments to luxury villas — every listing personally vetted.
          </p>
        </div>

        <div className="rl-hero__counter">
          <div className="rl-hero__counter-num">{properties.length}</div>
          <div className="rl-hero__counter-label">live listings · updated today</div>
        </div>

        <FeaturedCarousel navigate={navigate} />

        <div className="rl-hero__foot">
          <span className="rl-hero__foot-label">★ Featured this week</span>
          <a href="#rl-sentinel" className="rl-hero__foot-cta">Filter Listings →</a>
        </div>
      </div>

      {/* Sticky sentinel */}
      <div id="rl-sentinel" />

      {/* ── Filter bar ── */}
      <div className={`rl-filterbar${stuck ? ' rl-filterbar--stuck' : ''}`}>
        <div className="rl-filterbar__wrap">

          <div className="rl-filterbar__row">
            {/* Search */}
            <label className="rl-search">
              <Search size={13} strokeWidth={1.8} className="rl-search__icon" />
              <input
                className="rl-search__input"
                placeholder="Search district, name, or feature…"
                value={filters.query}
                onChange={(e) => set('query', e.target.value)}
              />
              {filters.query && (
                <button className="rl-search__clear" onClick={() => set('query', '')}>
                  <X size={12} strokeWidth={2.5} />
                </button>
              )}
            </label>

            {/* Type chips */}
            <div className="rl-type-chips">
              <button
                className={`rl-chip${filters.types.length === 0 ? ' rl-chip--active' : ''}`}
                onClick={() => set('types', [])}
              >
                All Types
              </button>
              {['Apartment', 'Duplex', 'Bungalow', 'Villa', 'Semi-Detached'].map((t) => (
                <button
                  key={t}
                  className={`rl-chip${filters.types.includes(t) ? ' rl-chip--active' : ''}`}
                  onClick={() => toggleType(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Advanced toggle */}
            <button
              className={`rl-adv-btn${drawerOpen ? ' rl-adv-btn--open' : ''}`}
              onClick={() => setDrawerOpen((o) => !o)}
            >
              <SlidersHorizontal size={13} strokeWidth={1.8} />
              Advanced
              {activeCount > 0 && <span className="rl-adv-badge">{activeCount}</span>}
            </button>
          </div>

          {/* District strip */}
          <div className="rl-filterbar__districts">
            <span className="rl-district-lbl">District:</span>
            {DISTRICTS.map((d) => (
              <button
                key={d}
                className={`rl-dpill${filters.districts.includes(d) ? ' rl-dpill--active' : ''}`}
                onClick={() => toggleDistrict(d)}
              >
                {d}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ── Advanced drawer ── */}
      {drawerOpen && (
        <div className="rl-drawer">
          <div className="rl-drawer__inner">
            <div className="rl-drawer__head">
              <span className="rl-drawer__title">Advanced Filters</span>
              <button className="rl-drawer__collapse" onClick={() => setDrawerOpen(false)}>
                ↑ collapse
              </button>
            </div>
            <div className="rl-drawer__grid">

              {/* Price */}
              <div className="rl-drawer__group">
                <div className="rl-drawer__glabel">Max Price / Year</div>
                <input
                  type="range"
                  className="rl-drawer__range"
                  min={5} max={50} step={2.5}
                  value={filters.maxPrice}
                  onChange={(e) => set('maxPrice', Number(e.target.value))}
                />
                <div className="rl-drawer__range-vals">
                  <span>₦5M</span>
                  <span className="rl-drawer__range-cur">
                    {filters.maxPrice >= 50 ? 'Any' : `₦${filters.maxPrice}M`}
                  </span>
                  <span>Any</span>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="rl-drawer__group">
                <div className="rl-drawer__glabel">Bedrooms</div>
                <div className="rl-drawer__chips">
                  {BEDS.map((b) => (
                    <button
                      key={b}
                      className={`rl-drawer__chip${filters.beds.includes(b) ? ' rl-drawer__chip--on' : ''}`}
                      onClick={() => toggleBed(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="rl-drawer__group">
                <div className="rl-drawer__glabel">Availability</div>
                <div className="rl-drawer__chips">
                  {[['all', 'All'], ['available', 'Available'], ['pending', 'Pending']].map(([val, label]) => (
                    <button
                      key={val}
                      className={`rl-drawer__chip${filters.availability === val ? ' rl-drawer__chip--on' : ''}`}
                      onClick={() => set('availability', val)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="rl-drawer__group">
                <div className="rl-drawer__glabel">Amenities</div>
                <div className="rl-drawer__amenity-grid">
                  {AMENITIES_LIST.map((a) => (
                    <label
                      key={a}
                      className="rl-drawer__amenity"
                      onClick={() => toggleAmenity(a)}
                    >
                      <span className={`rl-drawer__cb${filters.amenities.includes(a) ? ' rl-drawer__cb--on' : ''}`}>
                        {filters.amenities.includes(a) && <Check size={9} strokeWidth={3} />}
                      </span>
                      {a}
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── Toolbar ── */}
      <div className="rl-toolbar">
        <div className="rl-toolbar__left">
          <span className="rl-toolbar__count">{filtered.length}</span>
          <span className="rl-toolbar__cap">
            propert{filtered.length === 1 ? 'y' : 'ies'} found
          </span>
          <ActiveChips filters={filters} set={set} resetFilters={resetFilters} />
        </div>
        <div className="rl-toolbar__right">
          <span className="rl-toolbar__sort-lbl">Sort:</span>
          <select className="rl-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="beds-desc">Most Bedrooms</option>
          </select>
        </div>
      </div>

      {/* ── Listing grid ── */}
      <div className="rl-body">
        {filtered.length === 0 ? (
          <div className="rl-empty">
            <div className="rl-empty__icon">🏘</div>
            <div className="rl-empty__h">No properties match your filters</div>
            <p className="rl-empty__sub">
              Try adjusting your search or{' '}
              <button className="rl-empty__reset" onClick={resetFilters}>reset all filters</button>.
            </p>
          </div>
        ) : (
          <div className="rl-grid">
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

        {/* ── Bottom CTA ── */}
        <div className="rl-cta">
          <div className="rl-cta__inner">
            <div className="rl-cta__text">
              <div className="rl-cta__eyebrow">Can't find what you need?</div>
              <h2 className="rl-cta__h2">Tell us what you're<br /><em>looking for.</em></h2>
              <p className="rl-cta__sub">
                We often have unlisted properties. Describe your ideal home and we'll search our full network.
              </p>
            </div>
            <button className="rl-cta__btn" onClick={() => navigate('contact')}>
              Talk to an Agent →
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <PropertyModal
          property={selected}
          onClose={() => setSelected(null)}
          navigate={navigate}
        />
      )}

    </div>
  )
}
