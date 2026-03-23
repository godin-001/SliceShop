'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CELOSCAN_TX_URL } from '@/lib/celo'
import { truncateHash } from '@/lib/utils'

interface OrderConfirmationProps {
  orderId: string
  txHash: string
  isVisible: boolean
  onClose: () => void
}

export default function OrderConfirmation({ orderId, txHash, isVisible, onClose }: OrderConfirmationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            backgroundColor: '#22c55e',
            padding: '1rem 1.5rem',
            zIndex: 60,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.375rem',
            minWidth: '280px',
            cursor: 'crosshair',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: '"Syne", sans-serif',
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: '#0a0a0a',
              }}
            >
              Order {orderId} confirmed
            </span>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#0a0a0a',
                fontSize: '1rem',
                cursor: 'crosshair',
                fontFamily: '"DM Mono", monospace',
                padding: '0',
                lineHeight: 1,
                opacity: 0.7,
              }}
            >
              &#x2715;
            </button>
          </div>
          <a
            href={CELOSCAN_TX_URL(txHash)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.75rem',
              color: 'rgba(0,0,0,0.7)',
              textDecoration: 'none',
              cursor: 'crosshair',
            }}
          >
            tx: {truncateHash(txHash)}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
