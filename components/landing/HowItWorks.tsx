'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Sign in with ERC-8128',
    description: 'No passwords, no custodians. Sign a structured message with your wallet — the ERC-8128 standard gives you onchain-verifiable sessions.',
    accent: '#f97316',
  },
  {
    number: '02',
    title: 'Create your store',
    description: 'Claim an ENS name like yourstore.sliceshop.eth. Add products with prices in cUSD. Configure payment policies. Done in minutes.',
    accent: '#6366f1',
  },
  {
    number: '03',
    title: 'Agent processes orders',
    description: 'Your autonomous agent monitors incoming payments, verifies cUSD on Celo via x402, auto-confirms orders, and updates your ENS records.',
    accent: '#16a34a',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 px-6"
      style={{ backgroundColor: '#fafaf8' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '5rem' }}>
          <p style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.6875rem',
            color: '#71717a',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>
            How it works
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#1a1a1a',
            lineHeight: 1.2,
          }}>
            Three steps to your onchain store
          </h2>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '12px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              {/* Big faded step number */}
              <span style={{
                position: 'absolute',
                top: '-1rem',
                right: '1rem',
                fontFamily: '"Playfair Display", serif',
                fontSize: '6rem',
                fontWeight: 800,
                color: step.accent,
                opacity: 0.06,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                {step.number}
              </span>

              {/* Step label */}
              <div style={{
                display: 'inline-block',
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.625rem',
                fontWeight: 600,
                color: step.accent,
                background: `${step.accent}15`,
                padding: '0.25rem 0.625rem',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem',
              }}>
                Step {step.number}
              </div>

              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '0.75rem',
              }}>
                {step.title}
              </h3>

              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.9375rem',
                color: '#71717a',
                lineHeight: 1.65,
              }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
