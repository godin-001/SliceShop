'use client'

import { useState, useCallback } from 'react'

export type PaymentStep = 'review' | 'connect' | 'approve' | 'confirmation'

export function useCeloPayment() {
  const [step, setStep] = useState<PaymentStep>('review')
  const [isProcessing, setIsProcessing] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)

  const processPayment = useCallback(async () => {
    setIsProcessing(true)
    setStep('approve')
    // Simulate tx
    await new Promise((r) => setTimeout(r, 2000))
    const mockHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    setTxHash(mockHash)
    setStep('confirmation')
    setIsProcessing(false)
  }, [])

  const reset = useCallback(() => {
    setStep('review')
    setIsProcessing(false)
    setTxHash(null)
  }, [])

  return { step, setStep, isProcessing, txHash, processPayment, reset }
}
