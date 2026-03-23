'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { chaosCasing } from '@/lib/utils'
import { toSubdomain } from '@/lib/ens'

interface ConfirmationScreenProps {
  storeName: string
}

export default function ConfirmationScreen({ storeName }: ConfirmationScreenProps) {
  const ensName = toSubdomain(storeName)
  const slug = storeName.toLowerCase().replace(/[^a-z0-9]/g, '')

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8 max-w-md w-full"
      >
        {/* Success indicator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 flex items-center justify-center text-2xl font-bold"
          style={{
            backgroundColor: '#22c55e',
            color: '#0a0a0a',
          }}
        >
          ✓
        </motion.div>

        {/* Heading */}
        <h1
          className="text-3xl font-bold text-center"
          style={{ fontFamily: '"Syne", sans-serif', color: '#fff' }}
        >
          {chaosCasing('Your store is live')}
        </h1>

        {/* ENS name */}
        <div
          className="text-xl text-center"
          style={{
            fontFamily: '"DM Mono", monospace',
            color: '#22c55e',
          }}
        >
          {ensName}
        </div>

        {/* Links */}
        <div
          className="flex flex-col gap-3 w-full mt-4"
        >
          <Link
            href={`/store/${slug}`}
            className="w-full py-3 text-center text-xs uppercase font-bold tracking-widest block"
            style={{
              fontFamily: '"DM Mono", monospace',
              letterSpacing: '0.1em',
              backgroundColor: '#22c55e',
              color: '#0a0a0a',
              cursor: 'crosshair',
            }}
          >
            VISIT STORE
          </Link>

          <button
            onClick={() => navigator.clipboard.writeText(`https://${ensName}`)}
            className="w-full py-3 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            style={{
              fontFamily: '"DM Mono", monospace',
              letterSpacing: '0.1em',
              border: '0.5px solid rgba(255,255,255,0.08)',
              backgroundColor: 'transparent',
              cursor: 'crosshair',
            }}
          >
            SHARE
          </button>

          <Link
            href={`/dashboard/${slug}`}
            className="w-full py-3 text-center text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors block"
            style={{
              fontFamily: '"DM Mono", monospace',
              letterSpacing: '0.1em',
              border: '0.5px solid rgba(255,255,255,0.08)',
              cursor: 'crosshair',
            }}
          >
            GO TO DASHBOARD
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
