'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { type Product } from '@/lib/mock-data'
import { useStore } from '@/hooks/useStore'
import { chaosCasing } from '@/lib/utils'
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
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p className="font-[family-name:var(--font-dm-mono)] text-white/30 text-sm uppercase tracking-[0.1em] animate-pulse">
          Loading store...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Store Header */}
        <div className="mb-12">
          <p className="font-[family-name:var(--font-dm-mono)] text-sm text-white/40 mb-2">
            {store.ensName || `${decodeURIComponent(ensName)}.sliceshop.eth`}
          </p>
          <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-bold mb-3">
            {chaosCasing(store.name)}
          </h1>
          <p className="text-white/60 max-w-xl">{store.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="font-[family-name:var(--font-dm-mono)] text-xs text-white/30 uppercase tracking-[0.1em]">
              {store.category}
            </span>
            <span className="text-white/10">|</span>
            <span className="font-[family-name:var(--font-dm-mono)] text-xs text-[#a78bfa]">
              {store.products.length} products
            </span>
            <span className="text-white/10">|</span>
            <span className="font-[family-name:var(--font-dm-mono)] text-xs text-[#22c55e]">
              Powered by SliceShop
            </span>
          </div>
        </div>

        {/* Products */}
        <div className="mb-8">
          <p className="font-[family-name:var(--font-dm-mono)] text-xs text-white/30 uppercase tracking-[0.1em] mb-6">
            [01] — Products
          </p>
        </div>

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
