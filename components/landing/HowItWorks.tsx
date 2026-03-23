'use client'

import { motion } from 'framer-motion'
import { chaosCasing } from '@/lib/utils'

const steps = [
  {
    number: '01',
    title: 'Name your store',
    description: 'Claim an ENS subdomain — yourstore.sliceshop.eth — as your onchain identity.',
  },
  {
    number: '02',
    title: 'Add your products',
    description: 'Use the Slice product manager to list digital goods, physical merch, or services.',
  },
  {
    number: '03',
    title: 'Get paid',
    description: 'Receive cUSD or USDC directly to your wallet on Celo. No intermediaries.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 px-6"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <p
          className="text-xs uppercase mb-4"
          style={{
            fontFamily: 'DM Mono, monospace',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
          }}
        >
          [01] — How it works
        </p>

        {/* Section heading */}
        <h2
          className="text-3xl md:text-5xl font-bold text-white mb-20"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {chaosCasing('Three steps to your onchain store')}
        </h2>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            >
              {/* Huge faded number */}
              <span
                className="absolute -top-10 left-0 text-[8rem] font-bold leading-none select-none pointer-events-none"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  color: 'white',
                  opacity: 0.06,
                }}
              >
                {step.number}
              </span>

              <div className="relative z-10">
                <p
                  className="text-xs uppercase mb-3"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    color: '#22c55e',
                    letterSpacing: '0.08em',
                  }}
                >
                  Step {step.number}
                </p>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    color: 'rgba(255,255,255,0.45)',
                    maxWidth: 320,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
