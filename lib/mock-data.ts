export interface Product {
  id: string
  name: string
  description: string
  priceUSD: number
  stock: number | 'unlimited'
  category: 'digital' | 'physical' | 'service' | 'membership'
  digitalUrl?: string
  active: boolean
}

export interface Order {
  id: string
  productId: string
  productName: string
  amount: number
  currency: string
  buyerAddress: string
  buyerENS?: string
  status: 'confirmed' | 'pending' | 'fulfilled'
  txHash: string
  date: string
}

export interface Store {
  ensName: string
  name: string
  description: string
  category: string
  ownerAddress: string
  products: Product[]
  orders: Order[]
  totalRevenue: number
  visitors: number
  paymentCurrency: string
}

export interface AgentAction {
  id: string
  action: string
  detail: string
  timestamp: string
  type: 'order' | 'ens' | 'alert' | 'system' | 'erc8128' | 'x402'
  txHash?: string
}

export const featuredStores: { ensName: string; category: string; productCount: number; totalSales: number }[] = [
  { ensName: 'pixeldrops.sliceshop.eth', category: 'Digital Art', productCount: 12, totalSales: 840 },
  { ensName: 'merklemerch.sliceshop.eth', category: 'Physical Goods', productCount: 5, totalSales: 1240 },
  { ensName: 'zeroknowledge.sliceshop.eth', category: 'Courses', productCount: 3, totalSales: 2100 },
]

export const sampleProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Genesis NFT Pack',
    description: 'A curated collection of 5 unique generative art pieces minted on-chain. Each pack contains rare traits.',
    priceUSD: 25,
    stock: 47,
    category: 'digital',
    digitalUrl: 'https://ipfs.io/ipfs/Qm...',
    active: true,
  },
  {
    id: 'prod-002',
    name: 'Protocol Hoodie',
    description: 'Premium heavyweight cotton hoodie with embroidered protocol logo. Ships worldwide.',
    priceUSD: 65,
    stock: 12,
    category: 'physical',
    active: true,
  },
  {
    id: 'prod-003',
    name: 'ZK Fundamentals Course',
    description: 'Complete zero-knowledge proof course. 12 modules, lifetime access. From basics to building circuits.',
    priceUSD: 99,
    stock: 'unlimited',
    category: 'digital',
    digitalUrl: 'https://learn.zkfundamentals.xyz',
    active: true,
  },
  {
    id: 'prod-004',
    name: 'Node Operator Badge',
    description: 'Soulbound token proving validator participation. Claim after 30 days of uptime.',
    priceUSD: 10,
    stock: 200,
    category: 'digital',
    active: true,
  },
  {
    id: 'prod-005',
    name: 'DAO Governance Toolkit',
    description: 'Templates and smart contract snippets for launching your own DAO. Includes legal framework docs.',
    priceUSD: 45,
    stock: 'unlimited',
    category: 'digital',
    active: false,
  },
]

export const sampleOrders: Order[] = [
  {
    id: 'ORD-1001',
    productId: 'prod-001',
    productName: 'Genesis NFT Pack',
    amount: 25,
    currency: 'cUSD',
    buyerAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18',
    buyerENS: 'vitalik.eth',
    status: 'confirmed',
    txHash: '0x8a2f3e4d5c6b7a8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2',
    date: '2026-03-22T14:30:00Z',
  },
  {
    id: 'ORD-1002',
    productId: 'prod-003',
    productName: 'ZK Fundamentals Course',
    amount: 99,
    currency: 'cUSD',
    buyerAddress: '0x1234567890abcdef1234567890abcdef12345678',
    buyerENS: 'alice.eth',
    status: 'fulfilled',
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
    date: '2026-03-21T09:15:00Z',
  },
  {
    id: 'ORD-1003',
    productId: 'prod-002',
    productName: 'Protocol Hoodie',
    amount: 65,
    currency: 'cUSD',
    buyerAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    status: 'pending',
    txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
    date: '2026-03-23T02:45:00Z',
  },
  {
    id: 'ORD-1004',
    productId: 'prod-001',
    productName: 'Genesis NFT Pack',
    amount: 25,
    currency: 'USDC',
    buyerAddress: '0x9876543210fedcba9876543210fedcba98765432',
    buyerENS: 'bob.eth',
    status: 'confirmed',
    txHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
    date: '2026-03-20T18:00:00Z',
  },
  {
    id: 'ORD-1005',
    productId: 'prod-004',
    productName: 'Node Operator Badge',
    amount: 10,
    currency: 'cUSD',
    buyerAddress: '0xfedcba9876543210fedcba9876543210fedcba98',
    buyerENS: 'node-runner.eth',
    status: 'confirmed',
    txHash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
    date: '2026-03-19T11:30:00Z',
  },
]

export const sampleAgentActions: AgentAction[] = [
  { id: 'act-001', action: 'ERC-8128 auth verified', detail: 'Merchant pixeldrops.sliceshop.eth signed in via ERC-8128', timestamp: '2026-03-25T10:00:00Z', type: 'erc8128' },
  { id: 'act-002', action: 'x402 payment processed', detail: '25 cUSD received for Genesis NFT Pack via x402 protocol', timestamp: '2026-03-25T09:45:00Z', type: 'x402', txHash: '0x8a2f3e4d5c6b7a8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2' },
  { id: 'act-003', action: 'Order confirmed', detail: 'ORD-1001 — Genesis NFT Pack — 25 cUSD received', timestamp: '2026-03-22T14:30:12Z', type: 'order', txHash: '0x8a2f3e4d5c6b7a8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2' },
  { id: 'act-004', action: 'Digital delivery sent', detail: 'IPFS link delivered to vitalik.eth for ORD-1001', timestamp: '2026-03-22T14:30:15Z', type: 'order' },
  { id: 'act-005', action: 'ENS subdomain updated', detail: 'pixeldrops.sliceshop.eth resolver set to 0x742d...', timestamp: '2026-03-22T12:00:00Z', type: 'ens' },
  { id: 'act-006', action: 'Low stock alert', detail: 'Protocol Hoodie — 12 remaining (threshold: 15)', timestamp: '2026-03-21T16:00:00Z', type: 'alert' },
  { id: 'act-007', action: 'x402 payment rejected', detail: 'Insufficient cUSD for Protocol Hoodie — expected 65, received 50', timestamp: '2026-03-21T14:00:00Z', type: 'x402' },
  { id: 'act-008', action: 'Order fulfilled', detail: 'ORD-1002 — ZK Fundamentals Course — access granted to alice.eth', timestamp: '2026-03-21T09:15:30Z', type: 'order', txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2' },
  { id: 'act-009', action: 'ERC-8128 session expired', detail: 'Session for 0x742d...bD18 expired after 30 minutes', timestamp: '2026-03-21T08:00:00Z', type: 'erc8128' },
  { id: 'act-010', action: 'Payment processed', detail: '65 cUSD from 0xabcd... for Protocol Hoodie', timestamp: '2026-03-23T02:45:05Z', type: 'order', txHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3' },
  { id: 'act-011', action: 'System health check', detail: 'All store contracts operational. RPC latency: 120ms', timestamp: '2026-03-23T00:00:00Z', type: 'system' },
]

export const mockStore: Store = {
  ensName: 'pixeldrops.sliceshop.eth',
  name: 'Pixel Drops',
  description: 'Curated digital art and collectibles. Every piece is generative, every drop is unique.',
  category: 'Digital goods',
  ownerAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18',
  products: sampleProducts.filter(p => p.active),
  orders: sampleOrders,
  totalRevenue: 840,
  visitors: 1247,
  paymentCurrency: 'cUSD',
}
