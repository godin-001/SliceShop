'use client'

import { motion } from 'framer-motion'

const items = ['cUSD', 'ENS', 'ERC-8128', 'Celo', 'x402', 'Stablecoins', 'Agents', 'Slice', 'USDC', 'wagmi', 'viem']
const duplicated = [...items, ...items, ...items]

export default function Ticker() {
  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      style={{
        borderTop: '1px solid rgba(0,0,0,0.07)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        backgroundColor: '#ffffff',
      }}
    >
      <motion.div
        className="inline-flex py-3"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          x: {
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-xs"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              color: '#71717a',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {item}
            <span
              className="ml-8"
              style={{ color: '#f97316', opacity: 0.5 }}
            >
              ·
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
