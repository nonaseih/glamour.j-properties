import { useState } from 'react'
import heroImg from './assets/JAY hero image.jpg'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import HomePage from './pages/HomePage'
import AgentsPage from './pages/AgentsPage'
import RentalsPage from './pages/RentalsPage'
import ContactPage from './pages/ContactPage'
import ApplyPage from './pages/ApplyPage'
import TestimonialsPage from './pages/TestimonialsPage'
import FAQPage from './pages/FAQPage'
import PropertyDetailPage from './pages/PropertyDetailPage'

export default function App() {
  const [page, setPage] = useState('home')
  const [propertyId, setPropertyId] = useState(null)
  const [fromPage, setFromPage] = useState('home')

  const navigate = (to, id) => {
    setFromPage(page)
    setPage(to)
    if (id !== undefined) setPropertyId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showNav = page !== 'home' && page !== 'property' && page !== 'rentals' && page !== 'agents' && page !== 'testimonials' && page !== 'faq' && page !== 'contact'

  const pages = {
    home: <HomePage navigate={navigate} page={page} />,
    agents: <AgentsPage navigate={navigate} />,
    rentals: <RentalsPage navigate={navigate} />,
    contact: <ContactPage navigate={navigate} />,
    apply: <ApplyPage navigate={navigate} />,
    testimonials: <TestimonialsPage navigate={navigate} />,
    faq: <FAQPage navigate={navigate} />,
    property: <PropertyDetailPage navigate={navigate} propertyId={propertyId} fromPage={fromPage} />,
  }

  return (
    <div className="site">
      <div className="site-bg" style={{ backgroundImage: `url(${heroImg})` }} />
      {showNav && <Nav page={page} navigate={navigate} />}
      <main style={{ paddingTop: showNav ? 'var(--nav-h)' : 0 }}>{pages[page]}</main>
      <Footer navigate={navigate} />
      {showNav && <WhatsAppFloat />}
    </div>
  )
}
