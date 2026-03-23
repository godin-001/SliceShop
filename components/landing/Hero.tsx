'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { chaosCasing } from '@/lib/utils'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1
            className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {chaosCasing('Open a store.')}
            <br />
            <span
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.6)',
                color: 'transparent',
              }}
            >
              {chaosCasing('Get paid onchain.')}
            </span>
          </h1>

          <motion.p
            className="mt-6 text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: 'DM Mono, monospace',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 480,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            ENS name. Celo payments. Slice commerce. No code required.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <Link
              href="/create"
              style={{
                fontFamily: 'DM Mono, monospace',
                backgroundColor: '#22c55e',
                color: '#0a0a0a',
                letterSpacing: '0.1em',
                cursor: 'crosshair',
              }}
              className="inline-block px-6 py-3 text-xs font-semibold uppercase no-underline transition-opacity hover:opacity-80"
            >
              CREATE MY STORE ↗
            </Link>

            <a
              href="#how-it-works"
              style={{
                fontFamily: 'DM Mono, monospace',
                border: '0.5px solid rgba(255,255,255,0.25)',
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.1em',
                cursor: 'crosshair',
              }}
              className="inline-block px-6 py-3 text-xs font-semibold uppercase no-underline transition-colors hover:text-white"
            >
              SEE HOW IT WORKS
            </a>
          </motion.div>
        </motion.div>

        {/* Right — floating store preview card */}
        <motion.div
          className="hidden lg:flex justify-end"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div
            style={{
              backgroundColor: '#111',
              border: '0.5px solid rgba(255,255,255,0.08)',
              width: 360,
            }}
            className="p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <span
                className="text-xs uppercase"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  color: '#22c55e',
                  letterSpacing: '0.08em',
                }}
              >
                Store preview
              </span>
              <span
                className="text-xs"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                LIVE
              </span>
            </div>

            <h3
              className="text-lg font-bold text-white mb-1"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              pixeldrops.sliceshop.eth
            </h3>
            <p
              className="text-xs mb-5"
              style={{
                fontFamily: 'DM Mono, monospace',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              Digital Art
            </p>

            <div
              className="flex justify-between py-3"
              style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)' }}
            >
              <div>
                <p
                  className="text-[10px] uppercase mb-1"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.08em',
                  }}
                >
                  Products
                </p>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                  12
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] uppercase mb-1"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.08em',
                  }}
                >
                  Revenue
                </p>
                <p className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: '#22c55e' }}>
                  $840
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] uppercase mb-1"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.08em',
                  }}
                >
                  Currency
                </p>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                  cUSD
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
