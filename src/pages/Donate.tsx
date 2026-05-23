import { useState } from 'react'
import './Donate.css'

var donationLink = "https://pay.annoyinglink.click/"

const AMOUNTS = [1, 5, 10, 20, 50]

const TIERS = [
  {
    id: 'seed',
    icon: '◌',
    name: 'Seed',
    amount: 1,
  },
  {
    id: 'grove',
    icon: '◉',
    name: 'Grove',
    amount: 10,
    featured: true,
  },
  {
    id: 'canopy',
    icon: '✦',
    name: 'Canopy',
    amount: 50,
  },
]

export default function Donate() {
  const [selectedTier, setSelectedTier] = useState('grove')
  const [customAmount, setCustomAmount] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const activeTier = TIERS.find(t => t.id === selectedTier)
  const displayAmount = customAmount
    ? `$${customAmount}`
    : `$${activeTier?.amount}`
  donationLink = "https://pay.annoyinglink.click/" + (customAmount
      ? ''
      : `donate-${activeTier?.amount}`)

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = donationLink
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
          <button className="close-thank-you" onClick={() => setSubmitted(false)}>
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="donate-page">
      <div className="donate-blob-warm" />
      <div className="donate-blob-cool" />

      <div className="donate-layout">
        <div className="tiers-col">
          <p className="donate-eyebrow">Support the Site</p>
          <h1 className="donate-title">Every dollar<br />helps build the future.</h1>
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
                    <span className="tier-price">${tier.amount}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="checkout-col">
          <div className="checkout-card">
            <h2 className="checkout-heading">Complete your donation</h2>
            <div className="quick-amounts">
              {AMOUNTS.map(amt => (
                <button
                  key={amt}
                  className={`quick-btn ${!customAmount && activeTier?.amount === amt ? 'quick-active' : ''}`}
                  onClick={() => {
                    setCustomAmount('')
                    const match = TIERS.find(t => t.amount === amt)
                    if (match){
                      setSelectedTier(match.id)
                        donationLink = "https://pay.annoyinglink.click/donate-" + amt
                      } else {
                      setSelectedTier('seed')
                      donationLink = "https://pay.annoyinglink.click/"
                      }
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

            <div className="checkout-summary">
              <span>One-time donation</span>
              <span className="summary-amount">{displayAmount}</span>
            </div>

            <a href={donationLink} target="_blank" className="btn donate-btn" onClick={handleSubmit}>
                <span>Donate {displayAmount}</span>
                <span className="donate-btn-icon">→</span>
            </a>
            <br/>
            <p className="checkout-note">
              🔒 Encrypted & secure through GoDaddy Payments®️
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
