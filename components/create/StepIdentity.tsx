'use client'

import { ConnectKitButton } from 'connectkit'
import { useENS } from '@/hooks/useENS'

const CATEGORIES = [
  { value: 'digital', label: 'Digital goods' },
  { value: 'physical', label: 'Physical' },
  { value: 'service', label: 'Services' },
  { value: 'membership', label: 'Memberships' },
] as const

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
  storeName,
  setStoreName,
  description,
  setDescription,
  category,
  setCategory,
  onNext,
}: StepIdentityProps) {
  const { subdomain, isAvailable } = useENS(storeName)

  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Wallet connection */}
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-[10px] uppercase"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Wallet
        </span>
        <ConnectKitButton />
      </div>

      {/* Store name */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[10px] uppercase"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Store Name
        </label>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="my-store"
          className="w-full px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none"
          style={{
            backgroundColor: 'transparent',
            border: '0.5px solid rgba(255,255,255,0.08)',
            fontFamily: '"DM Mono", monospace',
            cursor: 'crosshair',
          }}
        />
        {storeName && (
          <div
            className="text-sm mt-1"
            style={{
              fontFamily: '"DM Mono", monospace',
              color: isAvailable ? '#22c55e' : 'rgba(255,255,255,0.3)',
            }}
          >
            {subdomain}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[10px] uppercase"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your store..."
          rows={3}
          className="w-full px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none resize-none"
          style={{
            backgroundColor: 'transparent',
            border: '0.5px solid rgba(255,255,255,0.08)',
            fontFamily: '"DM Mono", monospace',
            cursor: 'crosshair',
          }}
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[10px] uppercase"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className="px-4 py-2 text-xs transition-colors"
              style={{
                fontFamily: '"DM Mono", monospace',
                letterSpacing: '0.05em',
                backgroundColor: category === cat.value ? '#22c55e' : 'transparent',
                color: category === cat.value ? '#0a0a0a' : 'rgba(255,255,255,0.5)',
                border: category === cat.value ? 'none' : '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: '9999px',
                cursor: 'crosshair',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        disabled={!storeName}
        className="mt-4 w-full py-3 text-xs uppercase font-bold tracking-widest transition-opacity disabled:opacity-30"
        style={{
          fontFamily: '"DM Mono", monospace',
          letterSpacing: '0.1em',
          backgroundColor: '#22c55e',
          color: '#0a0a0a',
          cursor: storeName ? 'crosshair' : 'not-allowed',
        }}
      >
        {'NEXT \u2192'}
      </button>
    </div>
  )
}
