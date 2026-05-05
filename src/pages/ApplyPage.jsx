import { useState } from 'react'

const STEPS = [
  { id: 0, label: 'Personal Info' },
  { id: 1, label: 'Employment' },
  { id: 2, label: 'References' },
  { id: 3, label: 'Documents' },
]

const DOCS_NEEDED = [
  'Valid government-issued ID (NIN, Passport, or Driver\'s Licence)',
  'Last 3 months\' payslips or bank statements',
  'Employer\'s letter (if employed)',
  'Utility bill showing current address',
  '2 passport photographs',
]

function Stepper({ step }) {
  return (
    <div className="stepper">
      {STEPS.map((s, i) => (
        <div key={s.id} className="stepper__item">
          <div className="stepper__dot-wrap">
            <div
              className={`stepper__dot${i === step ? ' stepper__dot--active' : i < step ? ' stepper__dot--done' : ''}`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`stepper__label${i === step ? ' stepper__label--active' : ''}`}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`stepper__line${i < step ? ' stepper__line--done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function Step0({ data, set }) {
  return (
    <>
      <div className="apply-form-card__title">Personal Information</div>
      <p className="apply-form-card__sub">Basic details about the primary applicant.</p>
      <div className="apply-form__grid">
        <div className="form-group">
          <label className="form-label">First Name *</label>
          <input className="form-input" value={data.firstName} onChange={set('firstName')} placeholder="Emeka" required />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name *</label>
          <input className="form-input" value={data.lastName} onChange={set('lastName')} placeholder="Okonkwo" required />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input className="form-input" type="email" value={data.email} onChange={set('email')} placeholder="you@example.com" required />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input className="form-input" type="tel" value={data.phone} onChange={set('phone')} placeholder="+234 800 000 0000" required />
        </div>
        <div className="form-group">
          <label className="form-label">Date of Birth *</label>
          <input className="form-input" type="date" value={data.dob} onChange={set('dob')} required />
        </div>
        <div className="form-group">
          <label className="form-label">Nationality *</label>
          <input className="form-input" value={data.nationality} onChange={set('nationality')} placeholder="Nigerian" />
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Current Address *</label>
          <input className="form-input" value={data.address} onChange={set('address')} placeholder="Full current residential address" required />
        </div>
        <div className="form-group">
          <label className="form-label">Move-in Date *</label>
          <input className="form-input" type="date" value={data.moveIn} onChange={set('moveIn')} required />
        </div>
        <div className="form-group">
          <label className="form-label">Tenancy Duration</label>
          <select className="form-select" value={data.duration} onChange={set('duration')}>
            <option value="">Select…</option>
            <option>1 Year</option>
            <option>2 Years</option>
            <option>3 Years</option>
          </select>
        </div>
      </div>
    </>
  )
}

function Step1({ data, set }) {
  return (
    <>
      <div className="apply-form-card__title">Employment Details</div>
      <p className="apply-form-card__sub">Income and employment status help landlords assess your application.</p>
      <div className="apply-form__grid">
        <div className="form-group">
          <label className="form-label">Employment Status *</label>
          <select className="form-select" value={data.status} onChange={set('status')} required>
            <option value="">Select…</option>
            <option>Employed (Full-time)</option>
            <option>Employed (Part-time)</option>
            <option>Self-Employed</option>
            <option>Civil Servant</option>
            <option>Retired</option>
            <option>Student</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Employer / Business Name</label>
          <input className="form-input" value={data.employer} onChange={set('employer')} placeholder="Company or business name" />
        </div>
        <div className="form-group">
          <label className="form-label">Job Title / Role</label>
          <input className="form-input" value={data.role} onChange={set('role')} placeholder="e.g. Software Engineer" />
        </div>
        <div className="form-group">
          <label className="form-label">Monthly Income (₦) *</label>
          <input className="form-input" type="number" value={data.income} onChange={set('income')} placeholder="e.g. 800000" required />
        </div>
        <div className="form-group">
          <label className="form-label">Work Phone</label>
          <input className="form-input" type="tel" value={data.workPhone} onChange={set('workPhone')} placeholder="+234 800 000 0000" />
        </div>
        <div className="form-group">
          <label className="form-label">Years at Current Job</label>
          <select className="form-select" value={data.years} onChange={set('years')}>
            <option value="">Select…</option>
            <option>Less than 1 year</option>
            <option>1–2 years</option>
            <option>3–5 years</option>
            <option>5+ years</option>
          </select>
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Employer's Address</label>
          <input className="form-input" value={data.empAddress} onChange={set('empAddress')} placeholder="Full office address" />
        </div>
      </div>
    </>
  )
}

function Step2({ data, set }) {
  return (
    <>
      <div className="apply-form-card__title">References</div>
      <p className="apply-form-card__sub">Please provide two references — at least one must be professional.</p>

      <div style={{ marginBottom: '1.75rem' }}>
        <div className="label" style={{ marginBottom: '1rem', color: 'var(--accent)', borderBottom: '1px solid var(--paper-2)', paddingBottom: '0.5rem' }}>
          Reference 1 (Professional)
        </div>
        <div className="apply-form__grid">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className="form-input" value={data.ref1Name} onChange={set('ref1Name')} placeholder="Dr. Amaka Eze" required />
          </div>
          <div className="form-group">
            <label className="form-label">Relationship *</label>
            <input className="form-input" value={data.ref1Rel} onChange={set('ref1Rel')} placeholder="Employer / Colleague" required />
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input className="form-input" type="email" value={data.ref1Email} onChange={set('ref1Email')} placeholder="ref@example.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input className="form-input" type="tel" value={data.ref1Phone} onChange={set('ref1Phone')} placeholder="+234 800 000 0000" required />
          </div>
        </div>
      </div>

      <div>
        <div className="label" style={{ marginBottom: '1rem', color: 'var(--accent)', borderBottom: '1px solid var(--paper-2)', paddingBottom: '0.5rem' }}>
          Reference 2 (Personal or Professional)
        </div>
        <div className="apply-form__grid">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={data.ref2Name} onChange={set('ref2Name')} placeholder="Chief Nnamdi Obi" />
          </div>
          <div className="form-group">
            <label className="form-label">Relationship</label>
            <input className="form-input" value={data.ref2Rel} onChange={set('ref2Rel')} placeholder="Family Friend / Mentor" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={data.ref2Email} onChange={set('ref2Email')} placeholder="ref2@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" type="tel" value={data.ref2Phone} onChange={set('ref2Phone')} placeholder="+234 800 000 0000" />
          </div>
        </div>
      </div>
    </>
  )
}

function Step3({ data, set }) {
  return (
    <>
      <div className="apply-form-card__title">Document Upload</div>
      <p className="apply-form-card__sub">Upload your supporting documents to complete the application.</p>

      <div className="docs-list" style={{ marginBottom: '2rem' }}>
        {DOCS_NEEDED.map((d) => (
          <div key={d} className="docs-list__item">
            <span className="docs-list__icon">📄</span>
            {d}
          </div>
        ))}
      </div>

      <div style={{ border: '2px dashed var(--paper-4)', borderRadius: 'var(--radius-md)', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📂</div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '0.4rem' }}>
          Drag &amp; drop files here
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '1rem' }}>
          Supported formats: PDF, JPG, PNG — Max 5MB each
        </p>
        <label style={{ cursor: 'pointer' }}>
          <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => set('files')(e)} />
          <span className="btn btn-outline">Browse Files</span>
        </label>
      </div>

      <div className="form-group" style={{ marginTop: '1.5rem' }}>
        <label className="form-label">Additional Notes</label>
        <textarea
          className="form-textarea"
          value={data.notes}
          onChange={set('notes')}
          placeholder="Anything else we should know about your application? (optional)"
        />
      </div>
    </>
  )
}

const defaultPersonal = { firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', address: '', moveIn: '', duration: '' }
const defaultEmployment = { status: '', employer: '', role: '', income: '', workPhone: '', years: '', empAddress: '' }
const defaultRefs = { ref1Name: '', ref1Rel: '', ref1Email: '', ref1Phone: '', ref2Name: '', ref2Rel: '', ref2Email: '', ref2Phone: '' }
const defaultDocs = { files: null, notes: '' }

export default function ApplyPage({ navigate }) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [personal, setPersonal] = useState(defaultPersonal)
  const [employment, setEmployment] = useState(defaultEmployment)
  const [refs, setRefs] = useState(defaultRefs)
  const [docs, setDocs] = useState(defaultDocs)

  const setter = (state, setState) => (key) => (e) =>
    setState((s) => ({ ...s, [key]: e.target.value }))

  const setP = setter(personal, setPersonal)
  const setE = setter(employment, setEmployment)
  const setR = setter(refs, setRefs)
  const setD = setter(docs, setDocs)

  const next = () => {
    if (step < 3) setStep((s) => s + 1)
    else setSubmitted(true)
  }

  const prev = () => setStep((s) => s - 1)

  if (submitted) {
    return (
      <section className="section">
        <div className="container container--narrow">
          <div className="apply-form-card success-state">
            <div className="success-state__icon">✓</div>
            <h2>Application Submitted!</h2>
            <p>
              Thank you, {personal.firstName}. Your rental application has been received.
              One of our agents will review it and contact you within 24–48 business hours.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('rentals')}>
                Browse More Properties
              </button>
              <button className="btn btn-outline" onClick={() => navigate('contact')}>
                Contact an Agent
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="label label--light">Rental Application</p>
          <h1>Apply to Rent</h1>
          <p>
            Complete the four-step form below. It typically takes 10–15 minutes.
            All information is kept strictly confidential.
          </p>
        </div>
      </div>

      <section className="section--sm">
        <div className="container">
          <Stepper step={step} />

          <div className="apply-layout">
            {/* ── Form ── */}
            <form onSubmit={(e) => { e.preventDefault(); next() }}>
              <div className="apply-form-card">
                {step === 0 && <Step0 data={personal} set={setP} />}
                {step === 1 && <Step1 data={employment} set={setE} />}
                {step === 2 && <Step2 data={refs} set={setR} />}
                {step === 3 && <Step3 data={docs} set={setD} />}

                <div className="apply-form__nav">
                  {step > 0 ? (
                    <button type="button" className="btn btn-outline" onClick={prev}>
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button type="submit" className="btn btn-primary">
                    {step < 3 ? 'Continue →' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </form>

            {/* ── Sidebar ── */}
            <aside className="apply-sidebar">
              <div className="apply-sidebar__card">
                <h4>What Happens Next?</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                  {[
                    ['1', 'We review your application (1–2 days)'],
                    ['2', 'Agent contacts you to discuss shortlist'],
                    ['3', 'Viewings arranged at your convenience'],
                    ['4', 'Offer made & tenancy agreement signed'],
                    ['5', 'Fees paid & keys collected'],
                  ].map(([n, text]) => (
                    <div key={n} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-light)',
                        color: 'var(--accent)', fontFamily: 'var(--font-display)', fontWeight: 700,
                        fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: '0.05rem'
                      }}>
                        {n}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.5, margin: 0 }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="apply-sidebar__card">
                <h4>Documents to Prepare</h4>
                <div className="docs-list">
                  {DOCS_NEEDED.slice(0, 3).map((d) => (
                    <div key={d} className="docs-list__item">
                      <span className="docs-list__icon">📄</span>
                      <span style={{ fontSize: '0.8rem' }}>{d}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--ink-light)', marginTop: '0.75rem' }}>
                  + 2 more required on step 4
                </p>
              </div>

              <div className="tour-banner">
                <h4>Need Help?</h4>
                <p>Our team is happy to guide you through the application. Call or WhatsApp us.</p>
                <a
                  href="https://wa.me/2348020000001?text=I%20need%20help%20with%20my%20rental%20application."
                  className="btn btn-primary btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
