'use client'

import { Product } from '@/lib/mock-data'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onBuy: (product: Product) => void
}

export default function ProductGrid({ products, onBuy }: ProductGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '1px',
      }}
    >
      <style>{`
        @media (min-width: 640px) {
          [data-product-grid] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          [data-product-grid] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
      <div
        data-product-grid
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '1px',
          backgroundColor: 'rgba(255,255,255,0.08)',
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onBuy={() => onBuy(product)} />
        ))}
      </div>
    </div>
  )
}
