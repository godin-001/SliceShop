'use client'

import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'
import { featuredStores } from '@/lib/mock-data'

export default function FeaturedStores() {
  return (
    <section className="py-28 px-6" style={{ backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.6875rem',
            color: '#71717a',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>
            Featured stores
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.2,
            }}>
              Already open for business
            </h2>
            <a
              href="/create"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                color: '#f97316',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'crosshair',
                borderBottom: '1px solid #f97316',
                paddingBottom: '2px',
              }}
            >
              Open yours ↗
            </a>
          </div>
        </div>

        {/* Store cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {featuredStores.map((store, i) => (
            <motion.div
              key={store.ensName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              style={{
                background: '#fafaf8',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '12px',
                padding: '1.75rem',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                cursor: 'crosshair',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'
                el.style.borderColor = 'rgba(0,0,0,0.14)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.boxShadow = 'none'
                el.style.borderColor = 'rgba(0,0,0,0.08)'
              }}
            >
              {/* Category badge */}
              <span style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.625rem',
                color: '#71717a',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                background: 'rgba(0,0,0,0.05)',
                padding: '0.2rem 0.5rem',
                borderRadius: '9999px',
              }}>
                {store.category}
              </span>

              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#1a1a1a',
                marginTop: '0.875rem',
                marginBottom: '1.5rem',
              }}>
                {store.ensName}
              </h3>

              {/* Stats */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(0,0,0,0.07)',
              }}>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div>
                    <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                      Products
                    </p>
                    <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a' }}>
                      {store.productCount}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                      Revenue
                    </p>
                    <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.25rem', fontWeight: 700, color: '#16a34a' }}>
                      {formatCurrency(store.totalSales)}
                    </p>
                  </div>
                </div>

                <a
                  href={`/store/${store.ensName.split('.')[0]}`}
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.6875rem',
                    color: '#f97316',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'crosshair',
                  }}
                >
                  Visit →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
