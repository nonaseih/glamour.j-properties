export default function AgentsPage({ navigate }) {
  return (
    <div className="cs-wall">
      <div className="cs-wall__inner">
        <div className="cs-wall__icon">🏗</div>
        <h1 className="cs-wall__title">Coming Soon</h1>
        <p className="cs-wall__sub">
          Our agents page is being crafted. Check back shortly.
        </p>
        <button className="cs-wall__btn" onClick={() => navigate('rentals')}>
          Browse Properties
        </button>
      </div>
    </div>
  )
}
