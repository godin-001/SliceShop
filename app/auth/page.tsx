'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { ConnectKitButton } from 'connectkit'
import { useERC8128 } from '@/hooks/useERC8128'
import { formatERC8128MessageForDisplay } from '@/lib/erc8128'

export default function AuthPage() {
  const router = useRouter()
  const { isConnected } = useAccount()
  const { session, isSigningIn, error, pendingMessage, signIn, isAuthenticated } = useERC8128()

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => router.push('/dashboard'), 1500)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, router])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: '#fafaf8',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '1rem',
          padding: '2.5rem',
        }}
      >
        {/* ERC-8128 Badge */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: '#f97316',
              padding: '0.375rem 0.875rem',
              borderRadius: '9999px',
              letterSpacing: '0.05em',
            }}
          >
            ERC-8128
          </span>
        </div>

        <h1
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#1a1a1a',
            textAlign: 'center',
            marginBottom: '0.5rem',
          }}
        >
          Sign in to SliceShop
        </h1>
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9375rem',
            color: '#71717a',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Authenticate with your wallet using ERC-8128
        </p>

        {/* Step 1: Connect Wallet */}
        {!isConnected && (
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                color: '#71717a',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Step 1 — Connect Wallet
            </p>
            <ConnectKitButton />
          </div>
        )}

        {/* Step 2: Sign message */}
        {isConnected && !isAuthenticated && (
          <div>
            <p
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                color: '#71717a',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Step 2 — Sign ERC-8128 Message
            </p>

            {pendingMessage && (
              <div
                style={{
                  backgroundColor: '#fafaf8',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.6875rem',
                  color: '#1a1a1a',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}
              >
                {formatERC8128MessageForDisplay(pendingMessage)}
              </div>
            )}

            <button
              onClick={signIn}
              disabled={isSigningIn}
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: isSigningIn ? '#fdba74' : '#f97316',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.5rem',
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: isSigningIn ? 'wait' : 'crosshair',
                transition: 'background-color 0.2s',
              }}
            >
              {isSigningIn ? 'Signing…' : 'Sign with ERC-8128'}
            </button>

            {error && (
              <p
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: '#ef4444',
                  marginTop: '1rem',
                  textAlign: 'center',
                }}
              >
                {error}
              </p>
            )}
          </div>
        )}

        {/* Step 3: Success */}
        {isAuthenticated && session && (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.25rem',
              }}
            >
              ✓
            </div>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.9375rem',
                color: '#16a34a',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              Authenticated
            </p>
            <p
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                color: '#71717a',
              }}
            >
              Redirecting to dashboard…
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
