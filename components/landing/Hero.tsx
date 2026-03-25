'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { chaosCasing } from '@/lib/utils'

const StoreMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.3 }}
    style={{
      background: '#ffffff',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
      fontFamily: '"IBM Plex Mono", monospace',
    }}
  >
    {/* Store header */}
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '1rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '0.625rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>ENS Store</p>
          <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1a1a1a', marginTop: '0.25rem' }}>pixeldrops.sliceshop.eth</p>
        </div>
        <span style={{
          background: '#dcfce7',
          color: '#16a34a',
          fontSize: '0.6rem',
          fontWeight: 600,
          padding: '0.25rem 0.625rem',
          borderRadius: '9999px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>Live</span>
      </div>
    </div>

    {/* Products */}
    {[
      { name: 'Genesis NFT Pack', price: '25 cUSD', badge: 'x402' },
      { name: 'Dev Hoodie (M)', price: '65 cUSD', badge: 'In stock' },
      { name: 'Protocol Access', price: '12 cUSD / mo', badge: 'Digital' },
    ].map((p) => (
      <div key={p.name} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.625rem 0',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}>
        <span style={{ fontSize: '0.75rem', color: '#1a1a1a' }}>{p.name}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.6875rem', color: '#16a34a', fontWeight: 600 }}>{p.price}</span>
          <span style={{
            fontSize: '0.5rem',
            background: '#fff7ed',
            color: '#f97316',
            padding: '0.125rem 0.375rem',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>{p.badge}</span>
        </div>
      </div>
    ))}

    {/* Agent indicator */}
    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{
        width: '6px', height: '6px',
        borderRadius: '50%',
        background: '#16a34a',
        display: 'inline-block',
        boxShadow: '0 0 0 2px rgba(22,163,74,0.2)',
      }} />
      <span style={{ fontSize: '0.625rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Agent active — 3 orders auto-confirmed today
      </span>
    </div>
  </motion.div>
)

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#fafaf8' }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
            }}
          >
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#f97316',
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.7rem',
              color: '#71717a',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              The Synthesis Hackathon — Celo · ENS · Slice
            </span>
          </motion.div>

          {/* Headline — chaos-casing only on h1 */}
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: '#1a1a1a',
              marginBottom: '1.5rem',
            }}
          >
            {chaosCasing('Open a store.')}<br />
            <span style={{ color: '#f97316' }}>
              {chaosCasing('Get paid onchain.')}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.0625rem',
              color: '#71717a',
              lineHeight: 1.7,
              maxWidth: 460,
              marginBottom: '2.5rem',
            }}
          >
            ENS identity. Celo stablecoin payments. ERC-8128 auth. Autonomous order agent. No code required.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Link
              href="/create"
              style={{
                fontFamily: '"Inter", sans-serif',
                background: '#f97316',
                color: '#ffffff',
                padding: '0.875rem 1.75rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                cursor: 'crosshair',
                transition: 'background 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#ea580c')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#f97316')}
            >
              Open your store ↗
            </Link>

            <Link
              href="/store/pixeldrops"
              style={{
                fontFamily: '"Inter", sans-serif',
                background: 'transparent',
                color: '#1a1a1a',
                padding: '0.875rem 1.75rem',
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                cursor: 'crosshair',
                border: '1px solid rgba(0,0,0,0.12)',
                transition: 'border-color 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)')}
            >
              Browse stores
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            style={{
              marginTop: '3rem',
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'ERC-8128 Auth', color: '#f97316' },
              { label: 'cUSD on Celo', color: '#16a34a' },
              { label: 'ENS Identity', color: '#6366f1' },
              { label: 'x402 Payments', color: '#0ea5e9' },
            ].map((chip) => (
              <span key={chip.label} style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.6875rem',
                color: chip.color,
                background: `${chip.color}12`,
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                border: `1px solid ${chip.color}30`,
              }}>
                {chip.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — store preview */}
        <div className="relative hidden lg:block">
          <StoreMockup />
          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              position: 'absolute',
              top: '-1rem',
              right: '-1.5rem',
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              fontFamily: '"IBM Plex Mono", monospace',
            }}
          >
            <p style={{ fontSize: '0.625rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Revenue today</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#16a34a', marginTop: '0.125rem' }}>+$248 cUSD</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            style={{
              position: 'absolute',
              bottom: '-1rem',
              left: '-1.5rem',
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              fontFamily: '"IBM Plex Mono", monospace',
            }}
          >
            <p style={{ fontSize: '0.625rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Celo tx confirmed</p>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1a1a1a', marginTop: '0.125rem' }}>0x8a2f…d2e3 ✓</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
