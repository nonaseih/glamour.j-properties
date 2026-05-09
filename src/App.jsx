import { useState } from 'react'
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

export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (to) => {
    setPage(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages = {
    home: <HomePage navigate={navigate} page={page} />,
    agents: <AgentsPage navigate={navigate} />,
    rentals: <RentalsPage navigate={navigate} />,
    contact: <ContactPage navigate={navigate} />,
    apply: <ApplyPage navigate={navigate} />,
    testimonials: <TestimonialsPage navigate={navigate} />,
    faq: <FAQPage navigate={navigate} />,
  }

  return (
    <div className="site">
      <Nav page={page} navigate={navigate} />
      <main style={{ paddingTop: page !== 'home' ? 'var(--nav-h)' : 0 }}>{pages[page]}</main>
      <Footer navigate={navigate} />
      <WhatsAppFloat />
    </div>
  )
}
