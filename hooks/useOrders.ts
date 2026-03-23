'use client'

import { useState } from 'react'
import { type Order, sampleOrders } from '@/lib/mock-data'

export function useOrders() {
  const [orders] = useState<Order[]>(sampleOrders)
  const [loading] = useState(false)

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0)
  const confirmedCount = orders.filter((o) => o.status === 'confirmed').length
  const pendingCount = orders.filter((o) => o.status === 'pending').length

  return { orders, loading, totalRevenue, confirmedCount, pendingCount }
}
