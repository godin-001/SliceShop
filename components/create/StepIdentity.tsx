'use client'

import { ConnectKitButton } from 'connectkit'
import { useENS } from '@/hooks/useENS'

const CATEGORIES = [
  { value: 'digital', label: 'Digital goods' },
  { value: 'physical', label: 'Physical' },
  { value: 'service', label: 'Services' },
  { value: 'membership', label: 'Memberships' },
] as const

const LABEL = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '0.625rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: '#71717a',
  display: 'block',
  marginBottom: '0.5rem',
}

const INPUT = {
  width: '100%',
  padding: '0.75rem 1rem',
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '0.875rem',
  color: '#1a1a1a',
  background: '#fafaf8',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '8px',
  outline: 'none',
  cursor: 'crosshair' as const,
}

interface StepIdentityProps {
  storeName: string
  setStoreName: (name: string) => void
  description: string
  setDescription: (desc: string) => void
  category: string
  setCategory: (cat: string) => void
  onNext: () => void
}

export default function StepIdentity({
  storeName, setStoreName, description, setDescription, category, setCategory, onNext,
}: StepIdentityProps) {
  const { subdomain, isAvailable } = useENS(storeName)

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Wallet */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={LABEL}>Wallet</span>
        <ConnectKitButton />
      </div>

      {/* Store name */}
      <div>
        <label style={LABEL}>Store Name</label>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="my-store"
          style={INPUT}
        />
        {storeName && (
          <p style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.75rem',
            color: isAvailable ? '#16a34a' : '#71717a',
            marginTop: '0.375rem',
          }}>
            {subdomain}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label style={LABEL}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your store..."
          rows={3}
          style={{ ...INPUT, resize: 'none' }}
        />
      </div>

      {/* Category */}
      <div>
        <label style={LABEL}>Category</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.6875rem',
                letterSpacing: '0.05em',
                padding: '0.375rem 0.875rem',
                borderRadius: '9999px',
                backgroundColor: category === cat.value ? '#f97316' : 'transparent',
                color: category === cat.value ? '#ffffff' : '#71717a',
                border: category === cat.value ? 'none' : '1px solid rgba(0,0,0,0.12)',
                cursor: 'crosshair',
                transition: 'all 0.15s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Next */}
      <button
        onClick={onNext}
        disabled={!storeName}
        style={{
          marginTop: '0.5rem',
          width: '100%',
          padding: '0.875rem',
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.9375rem',
          fontWeight: 600,
          backgroundColor: storeName ? '#f97316' : '#f9731660',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: storeName ? 'crosshair' : 'not-allowed',
          transition: 'background-color 0.2s',
        }}
      >
        Next →
      </button>
    </div>
  )
}
