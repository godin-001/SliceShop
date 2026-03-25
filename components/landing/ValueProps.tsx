'use client'

import { motion } from 'framer-motion'

const cards = [
  {
    icon: '🌐',
    color: '#6366f1',
    title: 'Your ENS, your store',
    description: 'yourname.sliceshop.eth — a human-readable onchain identity. Discovery, trust, and metadata all in one ENS name.',
  },
  {
    icon: '💚',
    color: '#16a34a',
    title: 'Paid in stablecoins',
    description: 'cUSD direct to your wallet on Celo. Fast, $0.001 fees, no bank account required. Borderless commerce.',
  },
  {
    icon: '🔐',
    color: '#f97316',
    title: 'ERC-8128 identity',
    description: 'Sign in with your wallet. No passwords, no OAuth. Cryptographically verified sessions, expired on-chain.',
  },
  {
    icon: '🤖',
    color: '#0ea5e9',
    title: 'Agent handles orders',
    description: 'Your autonomous agent verifies cUSD payments via x402, auto-confirms orders, and keeps your ENS metadata fresh.',
  },
]

export default function ValueProps() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <p style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.6875rem',
            color: '#71717a',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>
            Why SliceShop
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#1a1a1a',
            lineHeight: 1.2,
          }}>
            Everything a creator needs, nothing more
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
              style={{
                backgroundColor: '#fafaf8',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '12px',
                padding: '2rem',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* Icon circle */}
              <div style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '10px',
                background: `${card.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                marginBottom: '1.25rem',
              }}>
                {card.icon}
              </div>

              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '0.625rem',
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.9rem',
                color: '#71717a',
                lineHeight: 1.65,
              }}>
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
