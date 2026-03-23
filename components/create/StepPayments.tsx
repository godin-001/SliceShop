'use client'

import { useAccount } from 'wagmi'
import { formatAddress } from '@/lib/ens'

const CURRENCIES = ['cUSD', 'USDC', 'CELO'] as const

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
  paymentCurrency,
  setPaymentCurrency,
  autoConfirm,
  setAutoConfirm,
  onBack,
  onDeploy,
  isDeploying,
}: StepPaymentsProps) {
  const { address } = useAccount()

  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Payment currency */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[10px] uppercase"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Payment Currency
        </label>
        <div className="flex gap-2">
          {CURRENCIES.map((cur) => (
            <button
              key={cur}
              onClick={() => setPaymentCurrency(cur)}
              className="flex-1 py-3 text-xs uppercase font-bold tracking-widest transition-colors"
              style={{
                fontFamily: '"DM Mono", monospace',
                letterSpacing: '0.1em',
                backgroundColor: paymentCurrency === cur ? '#22c55e' : 'transparent',
                color: paymentCurrency === cur ? '#0a0a0a' : 'rgba(255,255,255,0.5)',
                border: paymentCurrency === cur ? 'none' : '0.5px solid rgba(255,255,255,0.08)',
                cursor: 'crosshair',
              }}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* Wallet address */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[10px] uppercase"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Payout Wallet
        </label>
        <div
          className="px-4 py-3 text-sm"
          style={{
            fontFamily: '"DM Mono", monospace',
            color: address ? '#22c55e' : 'rgba(255,255,255,0.2)',
            border: '0.5px solid rgba(255,255,255,0.08)',
          }}
        >
          {address ? formatAddress(address, 8) : 'No wallet connected'}
        </div>
      </div>

      {/* Order confirmation toggle */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[10px] uppercase"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Order Confirmation
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setAutoConfirm(true)}
            className="flex-1 py-3 text-xs transition-colors"
            style={{
              fontFamily: '"DM Mono", monospace',
              backgroundColor: autoConfirm ? '#a78bfa' : 'transparent',
              color: autoConfirm ? '#0a0a0a' : 'rgba(255,255,255,0.5)',
              border: autoConfirm ? 'none' : '0.5px solid rgba(255,255,255,0.08)',
              cursor: 'crosshair',
            }}
          >
            Automatic (agent)
          </button>
          <button
            onClick={() => setAutoConfirm(false)}
            className="flex-1 py-3 text-xs transition-colors"
            style={{
              fontFamily: '"DM Mono", monospace',
              backgroundColor: !autoConfirm ? '#a78bfa' : 'transparent',
              color: !autoConfirm ? '#0a0a0a' : 'rgba(255,255,255,0.5)',
              border: !autoConfirm ? 'none' : '0.5px solid rgba(255,255,255,0.08)',
              cursor: 'crosshair',
            }}
          >
            Manual review
          </button>
        </div>
      </div>

      {/* Store preview */}
      <div
        className="flex flex-col gap-2 p-4 mt-2"
        style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}
      >
        <span
          className="text-[10px] uppercase mb-2"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Store Preview
        </span>
        <div className="flex justify-between text-xs" style={{ fontFamily: '"DM Mono", monospace' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Currency</span>
          <span style={{ color: '#fff' }}>{paymentCurrency}</span>
        </div>
        <div className="flex justify-between text-xs" style={{ fontFamily: '"DM Mono", monospace' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Confirmation</span>
          <span style={{ color: '#fff' }}>{autoConfirm ? 'Automatic' : 'Manual'}</span>
        </div>
        <div className="flex justify-between text-xs" style={{ fontFamily: '"DM Mono", monospace' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Wallet</span>
          <span style={{ color: '#fff' }}>{address ? formatAddress(address, 6) : '—'}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onBack}
          disabled={isDeploying}
          className="flex-1 py-3 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors disabled:opacity-30"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            border: '0.5px solid rgba(255,255,255,0.08)',
            backgroundColor: 'transparent',
            cursor: isDeploying ? 'not-allowed' : 'crosshair',
          }}
        >
          {'\u2190 BACK'}
        </button>
        <button
          onClick={onDeploy}
          disabled={isDeploying}
          className="flex-1 py-3 text-xs uppercase font-bold tracking-widest transition-opacity disabled:opacity-70"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            backgroundColor: '#22c55e',
            color: '#0a0a0a',
            cursor: isDeploying ? 'wait' : 'crosshair',
          }}
        >
          {isDeploying ? 'DEPLOYING...' : 'DEPLOY STORE'}
        </button>
      </div>
    </div>
  )
}
