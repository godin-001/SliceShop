'use client'

import { useState, useCallback, useEffect } from 'react'
import { type Product, type Store, sampleProducts, mockStore } from '@/lib/mock-data'

const STORES_KEY = 'sliceshop:stores'

function saveStore(slug: string, store: Store) {
  if (typeof window === 'undefined') return
  const existing = JSON.parse(localStorage.getItem(STORES_KEY) || '{}')
  existing[slug] = store
  localStorage.setItem(STORES_KEY, JSON.stringify(existing))
}

function loadStore(slug: string): Store | null {
  if (typeof window === 'undefined') return null
  const existing = JSON.parse(localStorage.getItem(STORES_KEY) || '{}')
  return existing[slug] || null
}

export function loadAllStores(): Store[] {
  if (typeof window === 'undefined') return []
  const existing = JSON.parse(localStorage.getItem(STORES_KEY) || '{}')
  return Object.values(existing) as Store[]
}

export function useStore(ensName?: string) {
  const [store, setStore] = useState<Store>(mockStore)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!ensName) {
      setLoading(false)
      return
    }
    const slug = decodeURIComponent(ensName).toLowerCase().replace(/[^a-z0-9]/g, '')
    const saved = loadStore(slug)
    if (saved) {
      setStore(saved)
    } else {
      // Fall back to mockStore for demo purposes
      setStore(mockStore)
    }
    setLoading(false)
  }, [ensName])

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
    // Simulate deployment delay
    await new Promise((r) => setTimeout(r, 2500))

    // Save the store to localStorage so it persists
    const slug = storeName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const newStore: Store = {
      ensName: `${slug}.sliceshop.eth`,
      name: storeName,
      description: description || `${storeName} — Web3 store on SliceShop`,
      category,
      ownerAddress: '0x0000000000000000000000000000000000000000',
      products: products.length > 0 ? products : sampleProducts,
      orders: [],
      totalRevenue: 0,
      visitors: 0,
      paymentCurrency,
    }
    saveStore(slug, newStore)

    setIsDeploying(false)
    setIsDeployed(true)
  }, [storeName, description, category, products, paymentCurrency])

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
