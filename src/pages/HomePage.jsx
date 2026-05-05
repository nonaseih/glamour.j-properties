import { useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import { properties, values, formatPrice } from '../data'

const STATS = [
  { num: '200+', label: 'Homes Let' },
  { num: '12+', label: 'Years Experience' },
  { num: '98%', label: 'Client Satisfaction' },
  { num: '4', label: 'Expert Agents' },
]

const VALUE_ICONS = {
  T: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  S: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Q: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const getValueIcon = (v, i) => {
  if (i === 0 || i === 1) return VALUE_ICONS.T
  if (i === 2) return VALUE_ICONS.S
  return VALUE_ICONS.Q
}

export default function HomePage({ navigate }) {
  const [search, setSearch] = useState({ type: '', location: '', budget: '' })
  const featured = properties.filter((p) => p.featured)

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('rentals')
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="container">
          <div className="hero__content">
            <div className="hero__eyebrow">
              <div className="hero__eyebrow-dot" />
              <span className="label label--light">Premium Abuja Rentals</span>
            </div>

            <h1 className="hero__title">
              Find Your Perfect<br />
              <em>Home in Abuja</em>
            </h1>

            <p className="hero__subtitle">
              Transparent, fast, and professional residential rentals across
              Maitama, Jahi, Wuse, Asokoro, and beyond.
            </p>

            <div className="hero__actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('rentals')}>
                Browse Properties
              </button>
              <button className="btn btn-outline-white btn-lg" onClick={() => navigate('agents')}>
                Meet Our Agents
              </button>
            </div>

            <form className="hero__search-box" onSubmit={handleSearch}>
              <div className="hero__search-field">
                <div className="hero__search-label">Property Type</div>
                <select
                  className="hero__search-select"
                  value={search.type}
                  onChange={(e) => setSearch({ ...search, type: e.target.value })}
                >
                  <option value="">Any Type</option>
                  <option>Apartment</option>
                  <option>Duplex</option>
                  <option>Bungalow</option>
                  <option>Villa</option>
                  <option>Semi-Detached</option>
                  <option>Mansion</option>
                </select>
              </div>
              <div className="hero__search-field">
                <div className="hero__search-label">Location</div>
                <select
                  className="hero__search-select"
                  value={search.location}
                  onChange={(e) => setSearch({ ...search, location: e.target.value })}
                >
                  <option value="">Any Location</option>
                  <option>Maitama</option>
                  <option>Asokoro</option>
                  <option>Jahi</option>
                  <option>Wuse 2</option>
                  <option>Gwarinpa</option>
                  <option>Garki</option>
                </select>
              </div>
              <div className="hero__search-field">
                <div className="hero__search-label">Max Budget / Year</div>
                <select
                  className="hero__search-select"
                  value={search.budget}
                  onChange={(e) => setSearch({ ...search, budget: e.target.value })}
                >
                  <option value="">Any Budget</option>
                  <option>Under ₦6M</option>
                  <option>₦6M – ₦12M</option>
                  <option>₦12M – ₦20M</option>
                  <option>₦20M – ₦30M</option>
                  <option>Above ₦30M</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end', whiteSpace: 'nowrap' }}>
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="stats-bar">
        <div className="stats-bar__inner">
          {STATS.map((s) => (
            <div key={s.label} className="stats-bar__item">
              <div className="stats-bar__num">{s.num}</div>
              <div className="stats-bar__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <section className="about section">
        <div className="container">
          <div className="about__split">
            <div className="about__visual">
              <div className="about__img-main img-placeholder">
                <span>Office & Team</span>
              </div>
              <div className="about__img-accent img-placeholder">
                <span>Happy Tenants</span>
              </div>
            </div>

            <div className="about__content">
              <p className="label">Who We Are</p>
              <h2>Abuja's Most Trusted Rental Agency</h2>
              <p>
                Since 2012, Jay. G Properties & Rentals has been the go-to partner for
                discerning tenants seeking quality homes across the Federal Capital Territory.
                We operate on a simple principle: no hidden fees, no pressure, no surprises.
              </p>
              <p>
                Our team of four expert agents has an unmatched knowledge of Abuja's residential
                districts — from the diplomatic enclave of Asokoro to the family-friendly
                suburbs of Gwarinpa.
              </p>

              <div className="about__stats">
                <div>
                  <div className="about__stat-num">200+</div>
                  <div className="about__stat-label">Families Housed</div>
                </div>
                <div>
                  <div className="about__stat-num">98%</div>
                  <div className="about__stat-label">5-Star Reviews</div>
                </div>
                <div>
                  <div className="about__stat-num">12+</div>
                  <div className="about__stat-label">Years in Market</div>
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => navigate('agents')}>
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="values section">
        <div className="container">
          <div className="section-header section-header--center">
            <p className="label">Our Principles</p>
            <h2>Why Tenants Choose Us</h2>
            <p>We've built our agency around the four things Abuja renters told us mattered most.</p>
          </div>

          <div className="grid-4">
            {values.map((v, i) => (
              <div key={v.id} className="value-card">
                <div className="value-card__icon">
                  {getValueIcon(v, i)}
                </div>
                <h4>{v.title}</h4>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ── */}
      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="section-header flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="label">Handpicked For You</p>
              <h2>Featured Properties</h2>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('rentals')}>
              View All Listings
            </button>
          </div>

          <div className="grid-2">
            {featured.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                navigate={navigate}
                onViewDetails={() => navigate('rentals')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="container">
          <p className="label label--light" style={{ marginBottom: '0.75rem' }}>Ready to Move?</p>
          <h2>Your Dream Home is One Application Away</h2>
          <p>Start your rental application today — it only takes a few minutes and our team will guide you through every step.</p>
          <div className="cta-banner__actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('apply')}>
              Apply to Rent
            </button>
            <button className="btn btn-outline-white btn-lg" onClick={() => navigate('contact')}>
              Talk to an Agent
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
