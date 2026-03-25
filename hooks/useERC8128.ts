'use client'

import { useState, useCallback, useEffect } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { buildERC8128Message, serializeForSigning, generateNonce } from '@/lib/erc8128'
import type { ERC8128Message } from '@/lib/erc8128'

const SESSION_KEY = 'sliceshop:erc8128:session'

interface ERC8128Session {
  address: string
  token: string
  signedAt: string
}

export function useERC8128() {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [session, setSession] = useState<ERC8128Session | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingMessage, setPendingMessage] = useState<ERC8128Message | null>(null)

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) {
        setSession(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
  }, [])

  const signIn = useCallback(async () => {
    if (!address) {
      setError('Connect your wallet first')
      return
    }

    setIsSigningIn(true)
    setError(null)

    try {
      const nonce = generateNonce()
      const message = buildERC8128Message(address, nonce)
      setPendingMessage(message)

      const messageString = serializeForSigning(message)
      const signature = await signMessageAsync({ message: messageString })

      const response = await fetch('/api/auth/erc8128', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature, address }),
      })

      const data = await response.json()

      if (data.success) {
        const newSession: ERC8128Session = {
          address: data.address,
          token: data.token,
          signedAt: new Date().toISOString(),
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession))
        setSession(newSession)
      } else {
        setError(data.error || 'Authentication failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed')
    } finally {
      setIsSigningIn(false)
      setPendingMessage(null)
    }
  }, [address, signMessageAsync])

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
    setError(null)
  }, [])

  return {
    session,
    isSigningIn,
    error,
    pendingMessage,
    signIn,
    signOut,
    isAuthenticated: !!session,
  }
}
