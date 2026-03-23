'use client'

import { Product } from '@/lib/mock-data'

interface ProductsManagerProps {
  products: Product[]
}

export default function ProductsManager({ products }: ProductsManagerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button
          style={{
            backgroundColor: '#22c55e',
            color: '#0a0a0a',
            border: 'none',
            padding: '0.625rem 1.25rem',
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: 'crosshair',
          }}
        >
          ADD PRODUCT
        </button>
      </div>

      <div
        style={{
          border: '0.5px solid rgba(255,255,255,0.08)',
          backgroundColor: '#111',
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderBottom: index < products.length - 1 ? '0.5px solid rgba(255,255,255,0.08)' : 'none',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {product.name}
              </span>
              <div style={{ display: 'flex', gap: '1rem', fontFamily: '"DM Mono", monospace', fontSize: '0.75rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {product.priceUSD} cUSD
                </span>
                <span style={{ color: product.stock === 'unlimited' ? '#a78bfa' : 'rgba(255,255,255,0.4)' }}>
                  {product.stock === 'unlimited' ? 'Unlimited' : `${product.stock} in stock`}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
              {/* Active/Inactive toggle */}
              <button
                style={{
                  width: '2.5rem',
                  height: '1.25rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: product.active ? '#22c55e' : 'rgba(255,255,255,0.15)',
                  position: 'relative',
                  cursor: 'crosshair',
                  transition: 'background-color 0.2s ease',
                  padding: 0,
                }}
              >
                <div
                  style={{
                    width: '0.875rem',
                    height: '0.875rem',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: product.active ? 'calc(100% - 1.0625rem)' : '0.1875rem',
                    transition: 'left 0.2s ease',
                  }}
                />
              </button>

              {/* Edit button */}
              <button
                style={{
                  background: 'none',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.5)',
                  padding: '0.375rem 0.75rem',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'crosshair',
                }}
              >
                EDIT
              </button>

              {/* Delete button */}
              <button
                style={{
                  background: 'none',
                  border: '0.5px solid rgba(239,68,68,0.3)',
                  color: '#ef4444',
                  padding: '0.375rem 0.75rem',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'crosshair',
                }}
              >
                DEL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
