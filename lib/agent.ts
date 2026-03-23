// Autonomous agent logic for order processing
// In production, this would be API routes with real contract interactions

import { type Order, type AgentAction } from './mock-data'

export interface AgentConfig {
  autoConfirm: boolean
  paymentCurrency: string
  walletAddress: string
  storeENS: string
}

export function processOrder(order: Order, config: AgentConfig): AgentAction[] {
  const actions: AgentAction[] = []
  const now = new Date().toISOString()

  if (config.autoConfirm) {
    actions.push({
      id: `act-${Date.now()}-1`,
      action: 'Payment verified',
      detail: `${order.amount} ${order.currency} received from ${order.buyerENS || order.buyerAddress}`,
      timestamp: now,
      type: 'order',
    })

    actions.push({
      id: `act-${Date.now()}-2`,
      action: 'Order confirmed',
      detail: `${order.id} — ${order.productName} — automatically confirmed`,
      timestamp: now,
      type: 'order',
    })
  }

  return actions
}

export function checkLowStock(products: { name: string; stock: number | 'unlimited' }[], threshold = 15): AgentAction[] {
  return products
    .filter((p) => typeof p.stock === 'number' && p.stock <= threshold && p.stock > 0)
    .map((p) => ({
      id: `act-${Date.now()}-stock-${p.name}`,
      action: 'Low stock alert',
      detail: `${p.name} — ${p.stock} remaining (threshold: ${threshold})`,
      timestamp: new Date().toISOString(),
      type: 'alert' as const,
    }))
}
