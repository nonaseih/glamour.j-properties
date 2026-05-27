import { useState, useEffect } from 'react'
import heroImg from './assets/JAY hero image.jpg'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import SiteLoader from './components/SiteLoader'
import HomePage from './pages/HomePage'
import AgentsPage from './pages/AgentsPage'
import RentalsPage from './pages/RentalsPage'
import ContactPage from './pages/ContactPage'
import ApplyPage from './pages/ApplyPage'
import TestimonialsPage from './pages/TestimonialsPage'
import FAQPage from './pages/FAQPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import LegalPage from './pages/LegalPage'

function parsePath() {
  const path = window.location.pathname
  const propMatch = path.match(/^\/property\/(\d+)$/)
  if (propMatch) return { page: 'property', propertyId: parseInt(propMatch[1]) }
  const slug = path.replace(/^\//, '')
  const known = ['rentals', 'agents', 'contact', 'apply', 'testimonials', 'faq', 'privacy', 'terms', 'cookies']
  if (known.includes(slug)) return { page: slug, propertyId: null }
  return { page: 'home', propertyId: null }
}

export default function App() {
  const initial = parsePath()
  const [page, setPage] = useState(initial.page)
  const [propertyId, setPropertyId] = useState(initial.propertyId)
  const [fromPage, setFromPage] = useState('home')
  const [rentalsReady, setRentalsReady] = useState(() => initial.page === 'rentals')
  const [appLoading, setAppLoading] = useState(() => !sessionStorage.getItem('siteLoaded'))

  useEffect(() => {
    if (!appLoading) return
    const minWait = new Promise((r) => setTimeout(r, 5000))
    const pageLoad = new Promise((r) => {
      if (document.readyState === 'complete') r()
      else window.addEventListener('load', r, { once: true })
    })
    Promise.all([minWait, pageLoad]).then(() => {
      sessionStorage.setItem('siteLoaded', '1')
      setAppLoading(false)
    })
  }, [])

  useEffect(() => {
    const onPop = () => {
      const { page: p, propertyId: id } = parsePath()
      setPage(p)
      if (id !== null) setPropertyId(id)
      if (p === 'rentals') setRentalsReady(true)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (to, id) => {
    setFromPage(page)
    setPage(to)
    if (id !== undefined) setPropertyId(id)
    if (to === 'rentals' && !rentalsReady) setRentalsReady(true)
    const path = to === 'home' ? '/' : to === 'property' ? `/property/${id}` : `/${to}`
    window.history.pushState({ page: to, propertyId: id ?? null }, '', path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showNav = page !== 'home' && page !== 'property' && page !== 'rentals' && page !== 'agents' && page !== 'testimonials' && page !== 'faq' && page !== 'contact' && page !== 'apply' && page !== 'privacy' && page !== 'terms' && page !== 'cookies'

  const pages = {
    home: <HomePage navigate={navigate} page={page} />,
    agents: <AgentsPage navigate={navigate} />,
    contact: <ContactPage navigate={navigate} />,
    apply: <ApplyPage navigate={navigate} />,
    testimonials: <TestimonialsPage navigate={navigate} />,
    faq: <FAQPage navigate={navigate} />,
    property: <PropertyDetailPage navigate={navigate} propertyId={propertyId} fromPage={fromPage} />,
    privacy:  <LegalPage navigate={navigate} type="privacy" />,
    terms:    <LegalPage navigate={navigate} type="terms" />,
    cookies:  <LegalPage navigate={navigate} type="cookies" />,
  }

  return (
    <>
    <SiteLoader visible={appLoading} />
    <div className="site">
      <div className="site-bg" style={{ backgroundImage: `url(${heroImg})` }} />
      {showNav && <Nav page={page} navigate={navigate} />}
      <main style={{ paddingTop: showNav ? 'var(--nav-h)' : 0 }}>
        {rentalsReady && (
          <div style={{ display: page === 'rentals' ? 'block' : 'none' }}>
            <RentalsPage navigate={navigate} />
          </div>
        )}
        {page !== 'rentals' && pages[page]}
      </main>
      <Footer navigate={navigate} />
      {showNav && <WhatsAppFloat />}
    </div>
    </>
  )
}
