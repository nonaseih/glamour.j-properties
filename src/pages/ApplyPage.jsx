import { useState } from 'react'
import { WA_BASE } from '../data'
import HeroNav from '../components/HeroNav'
import Reveal from '../components/Reveal'
import heroImg from '../assets/JAY hero image.jpg'

const STEPS = [
  { id: 0, label: 'Personal Info' },
  { id: 1, label: 'Employment' },
  { id: 2, label: 'References' },
  { id: 3, label: 'Documents' },
]

const DOCS_NEEDED = [
  "Valid government-issued ID (NIN, Passport, or Driver's Licence)",
  "Last 3 months' payslips or bank statements",
  'Employer\'s letter (if employed)',
  'Utility bill showing current address',
  '2 passport photographs',
]

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Stepper({ step }) {
  return (
    <div className="ap-stepper">
      {STEPS.map((s, i) => (
        <div key={s.id} className="ap-stepper__item">
          <div className={`ap-stepper__dot${i === step ? ' ap-stepper__dot--active' : i < step ? ' ap-stepper__dot--done' : ''}`}>
            {i < step ? <CheckIcon /> : i + 1}
          </div>
          <span className={`ap-stepper__label${i === step ? ' ap-stepper__label--active' : ''}`}>
            {s.label}
          </span>
          {i < STEPS.length - 1 && (
            <div className={`ap-stepper__line${i < step ? ' ap-stepper__line--done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function Step0({ data, set }) {
  return (
    <>
      <p className="ap-step-title">Personal Information</p>
      <p className="ap-step-sub">Basic details about the primary applicant.</p>
      <div className="ap-grid">
        <div className="ap-field">
          <label className="ap-label">First Name *</label>
          <input className="ap-input" value={data.firstName} onChange={set('firstName')} placeholder="Emeka" required />
        </div>
        <div className="ap-field">
          <label className="ap-label">Last Name *</label>
          <input className="ap-input" value={data.lastName} onChange={set('lastName')} placeholder="Okonkwo" required />
        </div>
        <div className="ap-field">
          <label className="ap-label">Email Address *</label>
          <input className="ap-input" type="email" value={data.email} onChange={set('email')} placeholder="you@example.com" required />
        </div>
        <div className="ap-field">
          <label className="ap-label">Phone Number *</label>
          <input className="ap-input" type="tel" value={data.phone} onChange={set('phone')} placeholder="+234 800 000 0000" required />
        </div>
        <div className="ap-field">
          <label className="ap-label">Date of Birth *</label>
          <input className="ap-input" type="date" value={data.dob} onChange={set('dob')} required />
        </div>
        <div className="ap-field">
          <label className="ap-label">Nationality *</label>
          <input className="ap-input" value={data.nationality} onChange={set('nationality')} placeholder="Nigerian" />
        </div>
        <div className="ap-field ap-field--full">
          <label className="ap-label">Current Address *</label>
          <input className="ap-input" value={data.address} onChange={set('address')} placeholder="Full current residential address" required />
        </div>
        <div className="ap-field">
          <label className="ap-label">Move-in Date *</label>
          <input className="ap-input" type="date" value={data.moveIn} onChange={set('moveIn')} required />
        </div>
        <div className="ap-field">
          <label className="ap-label">Tenancy Duration</label>
          <select className="ap-input ap-select" value={data.duration} onChange={set('duration')}>
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
      <p className="ap-step-title">Employment Details</p>
      <p className="ap-step-sub">Income and employment status help landlords assess your application.</p>
      <div className="ap-grid">
        <div className="ap-field">
          <label className="ap-label">Employment Status *</label>
          <select className="ap-input ap-select" value={data.status} onChange={set('status')} required>
            <option value="">Select…</option>
            <option>Employed (Full-time)</option>
            <option>Employed (Part-time)</option>
            <option>Self-Employed</option>
            <option>Civil Servant</option>
            <option>Retired</option>
            <option>Student</option>
          </select>
        </div>
        <div className="ap-field">
          <label className="ap-label">Employer / Business Name</label>
          <input className="ap-input" value={data.employer} onChange={set('employer')} placeholder="Company or business name" />
        </div>
        <div className="ap-field">
          <label className="ap-label">Job Title / Role</label>
          <input className="ap-input" value={data.role} onChange={set('role')} placeholder="e.g. Software Engineer" />
        </div>
        <div className="ap-field">
          <label className="ap-label">Monthly Income (₦) *</label>
          <input className="ap-input" type="number" value={data.income} onChange={set('income')} placeholder="e.g. 800000" required />
        </div>
        <div className="ap-field">
          <label className="ap-label">Work Phone</label>
          <input className="ap-input" type="tel" value={data.workPhone} onChange={set('workPhone')} placeholder="+234 800 000 0000" />
        </div>
        <div className="ap-field">
          <label className="ap-label">Years at Current Job</label>
          <select className="ap-input ap-select" value={data.years} onChange={set('years')}>
            <option value="">Select…</option>
            <option>Less than 1 year</option>
            <option>1..2 years</option>
            <option>3..5 years</option>
            <option>5+ years</option>
          </select>
        </div>
        <div className="ap-field ap-field--full">
          <label className="ap-label">Employer's Address</label>
          <input className="ap-input" value={data.empAddress} onChange={set('empAddress')} placeholder="Full office address" />
        </div>
      </div>
    </>
  )
}

function Step2({ data, set }) {
  return (
    <>
      <p className="ap-step-title">References</p>
      <p className="ap-step-sub">Please provide two references .. at least one must be professional.</p>

      <div className="ap-ref-group">
        <div className="ap-ref-head">Reference 1 .. Professional</div>
        <div className="ap-grid">
          <div className="ap-field">
            <label className="ap-label">Full Name *</label>
            <input className="ap-input" value={data.ref1Name} onChange={set('ref1Name')} placeholder="Dr. Amaka Eze" required />
          </div>
          <div className="ap-field">
            <label className="ap-label">Relationship *</label>
            <input className="ap-input" value={data.ref1Rel} onChange={set('ref1Rel')} placeholder="Employer / Colleague" required />
          </div>
          <div className="ap-field">
            <label className="ap-label">Email *</label>
            <input className="ap-input" type="email" value={data.ref1Email} onChange={set('ref1Email')} placeholder="ref@example.com" required />
          </div>
          <div className="ap-field">
            <label className="ap-label">Phone *</label>
            <input className="ap-input" type="tel" value={data.ref1Phone} onChange={set('ref1Phone')} placeholder="+234 800 000 0000" required />
          </div>
        </div>
      </div>

      <div className="ap-ref-group">
        <div className="ap-ref-head">Reference 2 .. Personal or Professional</div>
        <div className="ap-grid">
          <div className="ap-field">
            <label className="ap-label">Full Name</label>
            <input className="ap-input" value={data.ref2Name} onChange={set('ref2Name')} placeholder="Chief Nnamdi Obi" />
          </div>
          <div className="ap-field">
            <label className="ap-label">Relationship</label>
            <input className="ap-input" value={data.ref2Rel} onChange={set('ref2Rel')} placeholder="Family Friend / Mentor" />
          </div>
          <div className="ap-field">
            <label className="ap-label">Email</label>
            <input className="ap-input" type="email" value={data.ref2Email} onChange={set('ref2Email')} placeholder="ref2@example.com" />
          </div>
          <div className="ap-field">
            <label className="ap-label">Phone</label>
            <input className="ap-input" type="tel" value={data.ref2Phone} onChange={set('ref2Phone')} placeholder="+234 800 000 0000" />
          </div>
        </div>
      </div>
    </>
  )
}

function Step3({ data, set }) {
  return (
    <>
      <p className="ap-step-title">Document Upload</p>
      <p className="ap-step-sub">Upload your supporting documents to complete the application.</p>

      <div className="ap-docs-list">
        {DOCS_NEEDED.map((d) => (
          <div key={d} className="ap-docs-list__item">
            <span className="ap-docs-list__dot" />
            {d}
          </div>
        ))}
      </div>

      <label className="ap-upload">
        <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={(e) => set('files')(e)} />
        <div className="ap-upload__icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          </svg>
        </div>
        <p className="ap-upload__title">Drag &amp; drop files here</p>
        <p className="ap-upload__hint">PDF, JPG, PNG .. max 5 MB each</p>
        <span className="ap-upload__btn">Browse Files</span>
      </label>

      <div className="ap-field" style={{ marginTop: '20px' }}>
        <label className="ap-label">Additional Notes</label>
        <textarea
          className="ap-input ap-textarea"
          value={data.notes}
          onChange={set('notes')}
          placeholder="Anything else we should know about your application? (optional)"
          rows={4}
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

  const setter = (setState) => (key) => (e) =>
    setState((s) => ({ ...s, [key]: e.target.value }))

  const setP = setter(setPersonal)
  const setE = setter(setEmployment)
  const setR = setter(setRefs)
  const setD = setter(setDocs)

  const next = () => {
    if (step < 3) setStep((s) => s + 1)
    else setSubmitted(true)
  }

  const prev = () => setStep((s) => s - 1)

  const waHref = `${WA_BASE}?text=I%20need%20help%20with%20my%20rental%20application.`

  if (submitted) {
    return (
      <div className="ap-page">
        <div className="ap-hero-stage">
          <div className="ap-hero">
            <img className="ap-hero__bg" src={heroImg} alt="" aria-hidden="true" />
            <div className="ap-hero__vignette" />
            <HeroNav navigate={navigate} page="apply" />
            <div className="ap-hero__content">
              <p className="ap-hero__eyebrow">Application Complete</p>
              <h1 className="ap-hero__title">Thank You,<br /><em>{personal.firstName || 'Applicant'}!</em></h1>
            </div>
          </div>
        </div>
        <Reveal><div className="ap-body">
          <div className="ap-success">
            <div className="ap-success__icon">✓</div>
            <h2 className="ap-success__title">Application Submitted!</h2>
            <p className="ap-success__body">
              Your rental application has been received. One of our agents will review it and
              contact you within 24..48 business hours.
            </p>
            <div className="ap-success__actions">
              <button className="ap-btn ap-btn--dark" onClick={() => navigate('rentals')}>
                Browse More Properties
              </button>
              <button className="ap-btn ap-btn--outline" onClick={() => navigate('contact')}>
                Contact an Agent
              </button>
            </div>
          </div>
        </div></Reveal>
      </div>
    )
  }

  return (
    <div className="ap-page">

      {/* ── Hero ── */}
      <div className="ap-hero-stage">
        <div className="ap-hero">
          <img className="ap-hero__bg" src={heroImg} alt="" aria-hidden="true" />
          <div className="ap-hero__vignette" />
          <HeroNav navigate={navigate} page="apply" />
          <div className="ap-hero__content">
            <p className="ap-hero__eyebrow">Rental Application</p>
            <h1 className="ap-hero__title">Apply to<br /><em>Rent</em></h1>
            <p className="ap-hero__sub">
              Complete the four-step form below .. it takes around 10..15 minutes.
              All information is kept strictly confidential.
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <Reveal><div className="ap-body">
        <Stepper step={step} />

        <div className="ap-layout">

          {/* ── Form ── */}
          <form className="ap-form-wrap" onSubmit={(e) => { e.preventDefault(); next() }}>
            <div className="ap-form-card">
              {step === 0 && <Step0 data={personal} set={setP} />}
              {step === 1 && <Step1 data={employment} set={setE} />}
              {step === 2 && <Step2 data={refs} set={setR} />}
              {step === 3 && <Step3 data={docs} set={setD} />}

              <div className="ap-form-nav">
                {step > 0 ? (
                  <button type="button" className="ap-btn ap-btn--outline" onClick={prev}>
                    ← Back
                  </button>
                ) : (
                  <span />
                )}
                <button type="submit" className="ap-btn ap-btn--dark">
                  {step < 3 ? 'Continue →' : 'Submit Application'}
                </button>
              </div>
            </div>
          </form>

          {/* ── Sidebar ── */}
          <aside className="ap-sidebar">

            <div className="ap-sidebar-card">
              <h4 className="ap-sidebar-card__title">What Happens Next?</h4>
              <div className="ap-next-steps">
                {[
                  'We review your application (1..2 days)',
                  'Agent contacts you to discuss shortlist',
                  'Viewings arranged at your convenience',
                  'Offer made & tenancy agreement signed',
                  'Fees paid & keys collected',
                ].map((text, i) => (
                  <div key={i} className="ap-next-step">
                    <div className="ap-next-step__num">{i + 1}</div>
                    <p className="ap-next-step__text">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="ap-sidebar-card">
              <h4 className="ap-sidebar-card__title">Documents to Prepare</h4>
              <div className="ap-docs-mini">
                {DOCS_NEEDED.map((d, i) => (
                  <div key={i} className="ap-docs-mini__item">
                    <span className="ap-docs-mini__dot" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ap-sidebar-card">
              <h4 className="ap-sidebar-card__title">Consultation &amp; Tour Fees</h4>
              <div className="ap-docs-mini">
                <div className="ap-docs-mini__item">
                  <span className="ap-docs-mini__dot" />
                  <span><strong>Consultation fee:</strong> ₦10,000 (excludes inspection fee)</span>
                </div>
                <div className="ap-docs-mini__item">
                  <span className="ap-docs-mini__dot" />
                  <span><strong>Exclusive physical tour:</strong> ₦100,000/day · Minimum 5 properties · <em>Optional, not inspection fee</em></span>
                </div>
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(0,0,0,0.04)', borderRadius: '8px', fontSize: '0.82rem', lineHeight: 1.5 }}>
                <div style={{ fontWeight: 600, marginBottom: '6px' }}>Payment Details</div>
                <div>Account No: <strong>6312020162</strong></div>
                <div>Name: <strong>Ede Janet Uzoamaka</strong></div>
                <div>Bank: <strong>Fidelity Bank</strong></div>
              </div>
            </div>

            <div className="ap-sidebar-card ap-sidebar-card--dark">
              <h4 className="ap-sidebar-card__title">Need Help?</h4>
              <p className="ap-sidebar-card__body">
                Our team is happy to guide you through the application. Call or WhatsApp us anytime.
              </p>
              <a
                href={waHref}
                className="ap-wa-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.533 5.854L.057 23.882a.5.5 0 0 0 .61.61l6.088-1.467A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.876 0-3.637-.49-5.164-1.349l-.36-.21-3.814.919.938-3.742-.228-.374A9.963 9.963 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

          </aside>

        </div>
      </div></Reveal>

    </div>
  )
}
