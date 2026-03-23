'use client'

import { Product } from '@/lib/mock-data'
import { useCeloPayment } from '@/hooks/useCeloPayment'
import { CELOSCAN_TX_URL } from '@/lib/celo'
import { truncateHash } from '@/lib/utils'
import { ConnectKitButton } from 'connectkit'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

interface PurchaseModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function PurchaseModal({ product, isOpen, onClose }: PurchaseModalProps) {
  const { step, setStep, isProcessing, txHash, processPayment, reset } = useCeloPayment()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  if (!product) return null

  const handleClose = () => {
    onClose()
    reset()
  }

  const renderStep = () => {
    switch (step) {
      case 'review':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontFamily: '"Syne", sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>
              Review Order
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}>Product</span>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.8125rem', color: '#fff' }}>{product.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}>Quantity</span>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.8125rem', color: '#fff' }}>1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}>Total</span>
                <span style={{ fontFamily: '"Syne", sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#22c55e' }}>{product.priceUSD} cUSD</span>
              </div>
            </div>
            <button
              onClick={() => setStep(isConnected ? 'approve' : 'connect')}
              style={{
                backgroundColor: '#22c55e',
                color: '#0a0a0a',
                border: 'none',
                padding: '0.875rem 1rem',
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'crosshair',
              }}
            >
              CONTINUE
            </button>
          </div>
        )

      case 'connect':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <h3 style={{ fontFamily: '"Syne", sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>
              Connect Wallet
            </h3>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', margin: 0 }}>
              Connect your wallet to proceed with payment
            </p>
            <ConnectKitButton />
            {isConnected && (
              <button
                onClick={() => setStep('approve')}
                style={{
                  backgroundColor: '#22c55e',
                  color: '#0a0a0a',
                  border: 'none',
                  padding: '0.875rem 1.5rem',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'crosshair',
                  width: '100%',
                }}
              >
                CONTINUE TO PAYMENT
              </button>
            )}
          </div>
        )

      case 'approve':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <h3 style={{ fontFamily: '"Syne", sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>
              Approve Payment
            </h3>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', margin: 0 }}>
              {isProcessing ? 'Processing transaction...' : `Approve ${product.priceUSD} cUSD payment`}
            </p>
            {isProcessing ? (
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderTopColor: '#22c55e',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            ) : (
              <button
                onClick={processPayment}
                style={{
                  backgroundColor: '#22c55e',
                  color: '#0a0a0a',
                  border: 'none',
                  padding: '0.875rem 1.5rem',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'crosshair',
                  width: '100%',
                }}
              >
                APPROVE PAYMENT
              </button>
            )}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )

      case 'confirmation':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem' }}>&#10003;</div>
            <h3 style={{ fontFamily: '"Syne", sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#22c55e', margin: 0 }}>
              Payment Confirmed
            </h3>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', margin: 0 }}>
              Your purchase of {product.name} is complete.
            </p>
            {txHash && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                  Tx Hash
                </span>
                <a
                  href={CELOSCAN_TX_URL(txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.8125rem',
                    color: '#a78bfa',
                    textDecoration: 'none',
                    cursor: 'crosshair',
                  }}
                >
                  {truncateHash(txHash)}
                </a>
              </div>
            )}
            <button
              onClick={handleClose}
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                border: '0.5px solid rgba(255,255,255,0.2)',
                padding: '0.875rem 1.5rem',
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'crosshair',
                width: '100%',
              }}
            >
              CLOSE
            </button>
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem',
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#111',
              border: '0.5px solid rgba(255,255,255,0.08)',
              padding: '2rem',
              width: '100%',
              maxWidth: '28rem',
              position: 'relative',
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '1.25rem',
                cursor: 'crosshair',
                fontFamily: '"DM Mono", monospace',
                padding: '0.25rem',
                lineHeight: 1,
              }}
            >
              &#x2715;
            </button>
            {renderStep()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
