'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { type Product } from '@/lib/mock-data'
import { useStore } from '@/hooks/useStore'
import ProductGrid from '@/components/store/ProductGrid'
import PurchaseModal from '@/components/store/PurchaseModal'
import OrderConfirmation from '@/components/store/OrderConfirmation'

export default function StorePage() {
  const params = useParams()
  const ensName = params.ensName as string
  const { store, loading } = useStore(ensName)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [lastOrderId, setLastOrderId] = useState('')
  const [lastTxHash, setLastTxHash] = useState('')

  const handleBuy = (product: Product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    if (selectedProduct) {
      const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`
      const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      setLastOrderId(orderId)
      setLastTxHash(txHash)
      setShowConfirmation(true)
    }
    setSelectedProduct(null)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafaf8' }}>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', color: '#71717a', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Loading store…
        </p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem', background: '#fafaf8' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Store Header */}
        <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6875rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                {store.ensName || `${decodeURIComponent(ensName)}.sliceshop.eth`}
              </p>
              <h1 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                color: '#1a1a1a',
                lineHeight: 1.1,
                marginBottom: '0.75rem',
              }}>
                {store.name}
              </h1>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', color: '#71717a', maxWidth: '520px', lineHeight: 1.6 }}>
                {store.description}
              </p>
            </div>

            {/* Verified badge */}
            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              textAlign: 'right',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Verified</span>
              </div>
              <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6875rem', color: '#71717a' }}>
                Powered by SliceShop
              </p>
            </div>
          </div>

          {/* Meta chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: '#71717a', background: 'rgba(0,0,0,0.05)', padding: '0.25rem 0.625rem', borderRadius: '9999px' }}>
              {store.category}
            </span>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: '#6366f1', background: '#6366f115', padding: '0.25rem 0.625rem', borderRadius: '9999px' }}>
              {store.products.length} products
            </span>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: '#16a34a', background: '#16a34a15', padding: '0.25rem 0.625rem', borderRadius: '9999px' }}>
              cUSD on Celo
            </span>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: '#f97316', background: '#f9731615', padding: '0.25rem 0.625rem', borderRadius: '9999px' }}>
              x402 enabled
            </span>
          </div>
        </div>

        {/* Products section */}
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6875rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
          Products
        </p>

        <ProductGrid products={store.products} onBuy={handleBuy} />

        <PurchaseModal
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={handleModalClose}
        />

        <OrderConfirmation
          orderId={lastOrderId}
          txHash={lastTxHash}
          isVisible={showConfirmation}
          onClose={() => setShowConfirmation(false)}
        />
      </div>
    </div>
  )
}
