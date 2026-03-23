'use client'

import { motion } from 'framer-motion'

const items = ['cUSD', 'ENS', 'Slice', 'Celo', 'USDC', 'Base', 'Orders', 'Payments']
const duplicated = [...items, ...items]

export default function Ticker() {
  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      style={{
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        backgroundColor: '#0a0a0a',
      }}
    >
      <motion.div
        className="inline-flex py-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-sm"
            style={{
              fontFamily: 'DM Mono, monospace',
              color: 'rgba(255,255,255,0.35)',
              paddingLeft: '2rem',
              paddingRight: '2rem',
            }}
          >
            {item}
            <span
              className="ml-8"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            >
              &middot;
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
