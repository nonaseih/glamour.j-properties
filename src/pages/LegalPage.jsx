import { Construction, ArrowLeft } from 'lucide-react'
import HeroNav from '../components/HeroNav'

const META = {
  privacy: { title: 'Privacy Policy',    sub: 'Our privacy policy is being drafted. Check back shortly.' },
  terms:   { title: 'Terms of Service',  sub: 'Our terms of service are being drafted. Check back shortly.' },
  cookies: { title: 'Cookie Policy',     sub: 'Our cookie policy is being drafted. Check back shortly.' },
}

export default function LegalPage({ navigate, type }) {
  const { title, sub } = META[type] ?? META.privacy

  return (
    <div className="cs-wall">
      <HeroNav navigate={navigate} page={type} />
      <div className="cs-wall__inner">
        <div className="cs-wall__icon"><Construction size={48} strokeWidth={1.2} /></div>
        <h1 className="cs-wall__title">{title}</h1>
        <p className="cs-wall__sub">{sub}</p>
        <button className="cs-wall__btn cs-wall__btn--back" onClick={() => navigate('home')}>
          <ArrowLeft size={15} strokeWidth={2} />
          Go Back
        </button>
      </div>
    </div>
  )
}
