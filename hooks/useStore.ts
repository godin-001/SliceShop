'use client'

import { useState, useCallback } from 'react'
import { type Product, type Store, sampleProducts, mockStore } from '@/lib/mock-data'

export function useStore(ensName?: string) {
  const [store] = useState<Store>(mockStore)
  const [loading] = useState(false)

  return { store, loading }
}

export function useCreateStore() {
  const [step, setStep] = useState(1)
  const [storeName, setStoreName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('digital')
  const [products, setProducts] = useState<Product[]>([])
  const [paymentCurrency, setPaymentCurrency] = useState('cUSD')
  const [autoConfirm, setAutoConfirm] = useState(true)
  const [isDeploying, setIsDeploying] = useState(false)
  const [isDeployed, setIsDeployed] = useState(false)

  const addProduct = useCallback((product: Omit<Product, 'id' | 'active'>) => {
    setProducts((prev) => [...prev, { ...product, id: `prod-${Date.now()}`, active: true }])
  }, [])

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }, [])

  const deploy = useCallback(async () => {
    setIsDeploying(true)
    // Simulate deployment
    await new Promise((r) => setTimeout(r, 2500))
    setIsDeploying(false)
    setIsDeployed(true)
  }, [])

  const nextStep = useCallback(() => setStep((s) => Math.min(s + 1, 3)), [])
  const prevStep = useCallback(() => setStep((s) => Math.max(s - 1, 1)), [])

  return {
    step, setStep, nextStep, prevStep,
    storeName, setStoreName,
    description, setDescription,
    category, setCategory,
    products, addProduct, removeProduct, updateProduct,
    paymentCurrency, setPaymentCurrency,
    autoConfirm, setAutoConfirm,
    isDeploying, isDeployed, deploy,
  }
}
