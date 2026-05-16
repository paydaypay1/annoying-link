import { useState } from 'react'
import './Donate.css'

const AMOUNTS = [10, 25, 50, 100, 250]

const TIERS = [
  {
    id: 'seed',
    icon: '◌',
    name: 'Seed',
    amount: 10,
    period: 'month',
    perks: ['Public supporter badge', 'Monthly impact digest', 'Discord access'],
  },
  {
    id: 'grove',
    icon: '◉',
    name: 'Grove',
    amount: 50,
    period: 'month',
    perks: ['Everything in Seed', 'Vote on grant decisions', 'Quarterly calls with core team', 'Name in credits'],
    featured: true,
  },
  {
    id: 'canopy',
    icon: '✦',
    name: 'Canopy',
    amount: 250,
    period: 'month',
    perks: ['Everything in Grove', 'Direct advisory access', 'Dedicated impact report', 'Custom integration support'],
  },
]

export default function Donate() {
  const [selectedTier, setSelectedTier] = useState('grove')
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<'monthly' | 'once'>('once')
  const [submitted, setSubmitted] = useState(false)

  const activeTier = TIERS.find(t => t.id === selectedTier)
  const displayAmount = customAmount
    ? `$${customAmount}`
    : `$${activeTier?.amount}`

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="donate-page">
        <div className="donate-blob-warm" />
        <div className="thankyou">
          <div className="thankyou-icon">✦</div>
          <h1>Thank you.</h1>
          <p>
            Your generosity keeps the lights on.
          </p>
          <a href="pay.annoyinglink.click">
            <button className="btn-reset" onClick={() => setSubmitted(false)}>
              ← Other payment methods...
            </button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="donate-page">
      <div className="donate-blob-warm" />
      <div className="donate-blob-cool" />

      <div className="donate-layout">
        {/* Left: tiers */}
        <div className="tiers-col">
          <p className="donate-eyebrow">Support the Site</p>
          <h1 className="donate-title">Every dollar<br />builds the future.</h1>
          <p className="donate-sub">
            Your contributions are greatly appreciated. 
          </p>

          <div className="tiers">
            {TIERS.map(tier => (
              <button
                key={tier.id}
                className={`tier-card ${selectedTier === tier.id ? 'tier-active' : ''} ${tier.featured ? 'tier-featured' : ''}`}
                onClick={() => { setSelectedTier(tier.id); setCustomAmount('') }}
              >
                {tier.featured && <span className="tier-badge">Most popular</span>}
                <div className="tier-top">
                  <span className="tier-icon">{tier.icon}</span>
                  <div className="tier-info">
                    <span className="tier-name">{tier.name}</span>
                    <span className="tier-price">${tier.amount}<span>/mo</span></span>
                  </div>
                </div>
                <ul className="tier-perks">
                  {tier.perks.map(p => (
                    <li key={p}><span className="perk-check">✓</span>{p}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        {/* Right: checkout */}
        <div className="checkout-col">
          <div className="checkout-card">
            <h2 className="checkout-heading">Complete your donation</h2>

            {/* Frequency toggle */}
            <div className="freq-toggle">
              <button
                className={frequency === 'monthly' ? 'freq-btn active' : 'freq-btn'}
                onClick={() => setFrequency('monthly')}
              >Monthly</button>
              <button
                className={frequency === 'once' ? 'freq-btn active' : 'freq-btn'}
                onClick={() => setFrequency('once')}
              >One-time</button>
            </div>

            {/* Quick amounts */}
            <div className="quick-amounts">
              {AMOUNTS.map(amt => (
                <button
                  key={amt}
                  className={`quick-btn ${!customAmount && activeTier?.amount === amt ? 'quick-active' : ''}`}
                  onClick={() => {
                    setCustomAmount('')
                    const match = TIERS.find(t => t.amount === amt)
                    if (match) setSelectedTier(match.id)
                    else setSelectedTier('seed')
                  }}
                >
                  ${amt}
                </button>
              ))}
              <input
                className="quick-custom"
                type="number"
                placeholder="Custom"
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                min={1}
              />
            </div>

            {/* Summary */}
            <div className="checkout-summary">
              <span>{frequency === 'monthly' ? 'Monthly' : 'One-time'} donation</span>
              <span className="summary-amount">{displayAmount}</span>
            </div>

            {/* Form fields */}
            <div className="form-fields">
              <div className="field-row">
                <div className="field">
                  <label>First name</label>
                  <input type="text" placeholder="Jane" />
                </div>
                <div className="field">
                  <label>Last name</label>
                  <input type="text" placeholder="Smith" />
                </div>
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" placeholder="jane@example.com" />
              </div>
              <div className="field">
                <label>Card number</label>
                <input type="text" placeholder="4242 4242 4242 4242" maxLength={19} />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Expiry</label>
                  <input type="text" placeholder="MM / YY" maxLength={7} />
                </div>
                <div className="field">
                  <label>CVC</label>
                  <input type="text" placeholder="123" maxLength={3} />
                </div>
              </div>
            </div>

            <button className="donate-btn" onClick={handleSubmit}>
              <span>Donate {displayAmount} {frequency === 'monthly' ? '/ month' : 'once'}</span>
              <span className="donate-btn-icon">→</span>
            </button>

            <p className="checkout-note">
              🔒 Encrypted & secure · Cancel anytime · Tax receipt provided
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
