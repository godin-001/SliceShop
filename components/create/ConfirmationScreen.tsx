'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { toSubdomain } from '@/lib/ens'

interface ConfirmationScreenProps {
  storeName: string
}

export default function ConfirmationScreen({ storeName }: ConfirmationScreenProps) {
  const ensName = toSubdomain(storeName)
  const slug = storeName.toLowerCase().replace(/[^a-z0-9]/g, '')

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          backgroundColor: '#dcfce7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        ✓
      </motion.div>

      <h1 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '2rem',
        fontWeight: 700,
        color: '#1a1a1a',
        marginBottom: '0.75rem',
      }}>
        Your store is live
      </h1>

      <p style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '1rem',
        color: '#16a34a',
        fontWeight: 600,
        marginBottom: '0.5rem',
      }}>
        {ensName}
      </p>

      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.9375rem',
        color: '#71717a',
        marginBottom: '2.5rem',
      }}>
        Your store is registered on Celo and ready to accept cUSD payments.
      </p>

      {/* Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
        <Link href={`/store/${slug}`} style={{
          display: 'block', padding: '0.875rem',
          fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem', fontWeight: 600,
          color: '#ffffff', background: '#f97316', borderRadius: '8px',
          textDecoration: 'none', cursor: 'crosshair', textAlign: 'center',
        }}>
          Visit store ↗
        </Link>

        <button
          onClick={() => navigator.clipboard.writeText(`https://sliceshop-phi.vercel.app/store/${slug}`)}
          style={{
            padding: '0.875rem',
            fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem',
            color: '#71717a', background: 'transparent',
            border: '1px solid rgba(0,0,0,0.12)', borderRadius: '8px',
            cursor: 'crosshair',
          }}
        >
          Copy link
        </button>

        <Link href={`/dashboard/${slug}`} style={{
          display: 'block', padding: '0.875rem',
          fontFamily: '"Inter", sans-serif', fontSize: '0.9375rem',
          color: '#71717a', background: 'transparent',
          border: '1px solid rgba(0,0,0,0.12)', borderRadius: '8px',
          textDecoration: 'none', cursor: 'crosshair', textAlign: 'center',
        }}>
          Go to dashboard
        </Link>
      </div>
    </motion.div>
  )
}
