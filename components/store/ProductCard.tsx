'use client'

import { Product } from '@/lib/mock-data'

interface ProductCardProps {
  product: Product
  onBuy: () => void
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#111',
        border: '0.5px solid rgba(255,255,255,0.08)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        transition: 'border-color 0.2s ease',
        cursor: 'crosshair',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
      }}
    >
      <h3
        style={{
          fontFamily: '"Syne", sans-serif',
          fontSize: '1.125rem',
          fontWeight: 700,
          color: '#fff',
          margin: 0,
        }}
      >
        {product.name}
      </h3>

      <p
        style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.8125rem',
          color: 'rgba(255,255,255,0.5)',
          margin: 0,
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {product.description}
      </p>

      <div
        style={{
          fontFamily: '"Syne", sans-serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#fff',
        }}
      >
        {product.priceUSD} <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>cUSD</span>
      </div>

      <div
        style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.75rem',
          color: product.stock === 'unlimited' ? '#a78bfa' : product.stock <= 10 ? '#eab308' : '#22c55e',
        }}
      >
        {product.stock === 'unlimited' ? 'Unlimited' : `${product.stock} remaining`}
      </div>

      <button
        onClick={onBuy}
        style={{
          marginTop: 'auto',
          backgroundColor: '#22c55e',
          color: '#0a0a0a',
          border: 'none',
          padding: '0.75rem 1rem',
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.8125rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          cursor: 'crosshair',
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.85'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1'
        }}
      >
        BUY NOW
      </button>
    </div>
  )
}
