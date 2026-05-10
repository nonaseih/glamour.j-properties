import HeroNav from '../components/HeroNav'

export default function AgentsPage({ navigate }) {
  return (
    <div className="cs-wall">
      <HeroNav navigate={navigate} page="agents" />
      <div className="cs-wall__inner">
        <div className="cs-wall__icon">🚧</div>
        <h1 className="cs-wall__title">Under Construction</h1>
        <p className="cs-wall__sub">
          Our agents page is being built. Check back shortly.
        </p>
        <button className="cs-wall__btn" onClick={() => navigate('rentals')}>
          Browse Properties
        </button>
      </div>
    </div>
  )
}
