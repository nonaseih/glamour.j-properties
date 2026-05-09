import { useState } from 'react'
import HouseLogo from './HouseLogo'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'rentals', label: 'Rentals' },
  { id: 'agents', label: 'Agents' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ page, navigate }) {
  const [open, setOpen] = useState(false)

  const go = (id) => {
    navigate(id)
    setOpen(false)
  }

  return (
    <>
      <nav className="nav nav--solid">
        <div className="nav__inner">
          <button className="nav__logo" onClick={() => go('home')}>
            <HouseLogo size={32} />
            <div>
              <div className="nav__logo-name">Jay. G Properties</div>
              <div className="nav__logo-sub">& Rentals — Abuja</div>
            </div>
          </button>

          <div className="nav__links">
            <div className="nav__pill">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  className={`nav__link${page === l.id ? ' nav__link--active' : ''}`}
                  onClick={() => go(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn btn-primary btn-sm nav__cta"
            onClick={() => go('apply')}
          >
            Apply to Rent
          </button>

          <button
            className={`nav__hamburger${open ? ' nav__hamburger--open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {open && (
        <div className="nav__mobile nav__mobile--open">
          {LINKS.map((l) => (
            <button
              key={l.id}
              className={`nav__mobile-link${page === l.id ? ' nav__mobile-link--active' : ''}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
          <button
            className="btn btn-primary nav__mobile-cta"
            onClick={() => go('apply')}
          >
            Apply to Rent
          </button>
        </div>
      )}
    </>
  )
}
