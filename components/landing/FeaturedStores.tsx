'use client'

import { motion } from 'framer-motion'
import { chaosCasing, formatCurrency } from '@/lib/utils'
import { featuredStores } from '@/lib/mock-data'

export default function FeaturedStores() {
  return (
    <section className="py-28 px-6" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <p
          className="text-xs uppercase mb-4"
          style={{
            fontFamily: 'DM Mono, monospace',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
          }}
        >
          [02] — Featured stores
        </p>

        {/* Section heading */}
        <h2
          className="text-3xl md:text-5xl font-bold text-white mb-16"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {chaosCasing('Already open for business')}
        </h2>

        {/* Store cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStores.map((store, i) => (
            <motion.div
              key={store.ensName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="group p-6"
              style={{
                backgroundColor: '#111',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: 0,
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.2)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'
              }}
            >
              <p
                className="text-xs uppercase mb-1"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.08em',
                }}
              >
                {store.category}
              </p>

              <h3
                className="text-base font-bold text-white mb-5"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {store.ensName}
              </h3>

              <div
                className="flex justify-between items-end pt-4"
                style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex gap-6">
                  <div>
                    <p
                      className="text-[10px] uppercase mb-1"
                      style={{
                        fontFamily: 'DM Mono, monospace',
                        color: 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      Products
                    </p>
                    <p
                      className="text-sm text-white font-semibold"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {store.productCount}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-[10px] uppercase mb-1"
                      style={{
                        fontFamily: 'DM Mono, monospace',
                        color: 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      Sales
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ fontFamily: 'Syne, sans-serif', color: '#22c55e' }}
                    >
                      {formatCurrency(store.totalSales)}
                    </p>
                  </div>
                </div>

                <a
                  href={`/store/${store.ensName.split('.')[0]}`}
                  className="text-xs uppercase no-underline transition-colors hover:text-white"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.08em',
                    cursor: 'crosshair',
                  }}
                >
                  VISIT STORE →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
