'use client'

import { useAccount } from 'wagmi'
import { formatAddress } from '@/lib/ens'

const CURRENCIES = ['cUSD', 'USDC', 'CELO'] as const

const LABEL = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '0.625rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: '#71717a',
  display: 'block',
  marginBottom: '0.5rem',
}

interface StepPaymentsProps {
  paymentCurrency: string
  setPaymentCurrency: (currency: string) => void
  autoConfirm: boolean
  setAutoConfirm: (auto: boolean) => void
  onBack: () => void
  onDeploy: () => void
  isDeploying: boolean
}

export default function StepPayments({
  paymentCurrency, setPaymentCurrency, autoConfirm, setAutoConfirm, onBack, onDeploy, isDeploying,
}: StepPaymentsProps) {
  const { address } = useAccount()

  const btnActive = (active: boolean) => ({
    flex: 1, padding: '0.75rem 0.5rem',
    fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6875rem',
    fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const,
    backgroundColor: active ? '#f97316' : 'transparent',
    color: active ? '#ffffff' : '#71717a',
    border: active ? 'none' : '1px solid rgba(0,0,0,0.12)',
    borderRadius: '8px', cursor: 'crosshair', transition: 'all 0.15s',
  })

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Payment currency */}
      <div>
        <label style={LABEL}>Payment Currency</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {CURRENCIES.map(cur => (
            <button key={cur} onClick={() => setPaymentCurrency(cur)} style={btnActive(paymentCurrency === cur)}>
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* Payout wallet */}
      <div>
        <label style={LABEL}>Payout Wallet</label>
        <div style={{
          padding: '0.75rem 1rem', background: '#fafaf8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px',
          fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem',
          color: address ? '#16a34a' : '#71717a',
        }}>
          {address ? formatAddress(address, 8) : 'No wallet connected'}
        </div>
      </div>

      {/* Order confirmation */}
      <div>
        <label style={LABEL}>Order Confirmation</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setAutoConfirm(true)} style={btnActive(autoConfirm)}>
            Automatic (agent)
          </button>
          <button onClick={() => setAutoConfirm(false)} style={btnActive(!autoConfirm)}>
            Manual review
          </button>
        </div>
      </div>

      {/* Preview card */}
      <div style={{
        background: '#fafaf8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '1.25rem',
        display: 'flex', flexDirection: 'column', gap: '0.625rem',
      }}>
        <p style={LABEL}>Store summary</p>
        {[
          { label: 'Currency', value: paymentCurrency },
          { label: 'Confirmation', value: autoConfirm ? 'Automatic' : 'Manual' },
          { label: 'Wallet', value: address ? formatAddress(address, 6) : '—' },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: '#71717a' }}>{row.label}</span>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: '#1a1a1a', fontWeight: 500 }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={onBack} disabled={isDeploying} style={{
          flex: 1, padding: '0.875rem', fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem',
          color: '#71717a', background: 'transparent', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '8px',
          cursor: isDeploying ? 'not-allowed' : 'crosshair', opacity: isDeploying ? 0.5 : 1,
        }}>← Back</button>
        <button onClick={onDeploy} disabled={isDeploying} style={{
          flex: 1, padding: '0.875rem', fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem', fontWeight: 600,
          color: '#ffffff', background: '#f97316', border: 'none', borderRadius: '8px',
          cursor: isDeploying ? 'wait' : 'crosshair', opacity: isDeploying ? 0.7 : 1,
        }}>
          {isDeploying ? 'Deploying…' : 'Deploy Store ↗'}
        </button>
      </div>
    </div>
  )
}
