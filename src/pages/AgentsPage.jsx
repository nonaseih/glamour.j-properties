import { agents } from '../data'
import { WA_BASE } from '../data'

function AgentAvatar({ agent, size = 80 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--accent-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: size * 0.35,
        color: 'var(--accent)',
      }}
    >
      {agent.initials}
    </div>
  )
}

export default function AgentsPage({ navigate }) {
  const lead = agents[0]

  return (
    <>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="container">
          <p className="label label--light">The Team</p>
          <h1>Expert Agents, Real Results</h1>
          <p>
            Four specialists. One mission: match you with the right home, at the right price,
            with zero stress.
          </p>
        </div>
      </div>

      {/* ── Featured Agent ── */}
      <div className="agent-featured">
        <div className="container">
          <div className="agent-featured__inner">
            <div className="agent-featured__avatar img-placeholder" style={{ width: 160, height: 160, borderRadius: '50%' }}>
              <span style={{ zIndex: 1, position: 'relative', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.5rem', color: 'var(--accent)' }}>
                {lead.initials}
              </span>
            </div>
            <div>
              <p className="label label--light">Principal Agent & Founder</p>
              <div className="agent-featured__name">{lead.name}</div>
              <div className="agent-featured__role">{lead.role}</div>
              <p className="agent-featured__bio">{lead.bio}</p>
              <div className="agent-featured__stats">
                <div>
                  <div className="agent-featured__stat-num">{lead.listings}</div>
                  <div className="agent-featured__stat-label">Active Listings</div>
                </div>
                <div>
                  <div className="agent-featured__stat-num">{lead.closed}+</div>
                  <div className="agent-featured__stat-label">Deals Closed</div>
                </div>
                <div>
                  <div className="agent-featured__stat-num">{lead.rating}</div>
                  <div className="agent-featured__stat-label">Average Rating</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <a
                  href={`${WA_BASE}?text=Hi%20${encodeURIComponent(lead.name)}%2C%20I%27d%20like%20to%20enquire%20about%20a%20property.`}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <button className="btn btn-outline-white" onClick={() => navigate('contact')}>
                  Send a Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Agents Grid ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label">All Agents</p>
            <h2>Meet the Full Team</h2>
          </div>

          <div className="grid-4">
            {agents.map((agent) => (
              <div key={agent.id} className="agent-card">
                <div className="agent-card__img img-placeholder" style={{ aspectRatio: '1' }}>
                  <span style={{ zIndex: 1, position: 'relative', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: 'var(--accent)', background: 'var(--paper-3)', padding: '0.5rem 0.75rem', borderRadius: 4 }}>
                    {agent.initials}
                  </span>
                </div>
                <div className="agent-card__body">
                  <div className="agent-card__name">{agent.name}</div>
                  <div className="agent-card__role">{agent.role}</div>

                  <div className="agent-card__specialties">
                    {agent.specialties.map((s) => (
                      <span key={s} className="agent-card__specialty">{s}</span>
                    ))}
                  </div>

                  <div className="agent-card__stats">
                    <div style={{ textAlign: 'center' }}>
                      <div className="agent-card__stat-num">{agent.listings}</div>
                      <div className="agent-card__stat-label">Listings</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="agent-card__stat-num">{agent.closed}</div>
                      <div className="agent-card__stat-label">Closed</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="agent-card__stat-num">⭐{agent.rating}</div>
                      <div className="agent-card__stat-label">Rating</div>
                    </div>
                  </div>

                  <div className="agent-card__contact">
                    <a
                      href={`https://wa.me/${agent.whatsapp}?text=Hi%20${encodeURIComponent(agent.name)}%2C%20I%27d%20like%20to%20enquire%20about%20a%20property.`}
                      className="btn btn-primary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                    <button className="btn btn-outline btn-sm" onClick={() => navigate('contact')}>
                      Email
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container">
          <p className="label label--light" style={{ marginBottom: '0.75rem' }}>Book a Free Consultation</p>
          <h2>Not Sure Where to Start?</h2>
          <p>Tell us your budget, preferred area, and move-in date — we'll match you with the right agent and shortlist within 24 hours.</p>
          <div className="cta-banner__actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('contact')}>
              Get in Touch
            </button>
            <button className="btn btn-outline-white btn-lg" onClick={() => navigate('rentals')}>
              Browse Rentals
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
