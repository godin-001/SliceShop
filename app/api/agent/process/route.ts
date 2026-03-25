import { NextResponse } from 'next/server'

export async function GET() {
  const activity = [
    {
      id: 'agent-001',
      type: 'erc8128',
      action: 'ERC-8128 auth verified',
      detail: 'Merchant pixeldrops.sliceshop.eth signed in via ERC-8128',
      timestamp: '2026-03-25T10:00:00Z',
    },
    {
      id: 'agent-002',
      type: 'x402',
      action: 'x402 payment processed',
      detail: '25 cUSD received for Genesis NFT Pack via x402 protocol',
      txHash: '0x8a2f3e4d5c6b7a8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2',
      timestamp: '2026-03-25T09:45:00Z',
    },
    {
      id: 'agent-003',
      type: 'order',
      action: 'Order auto-confirmed',
      detail: 'ORD-1006 confirmed and digital delivery initiated',
      txHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
      timestamp: '2026-03-25T09:30:00Z',
    },
    {
      id: 'agent-004',
      type: 'erc8128',
      action: 'ERC-8128 session expired',
      detail: 'Session for 0x742d...bD18 expired after 30 minutes',
      timestamp: '2026-03-25T08:00:00Z',
    },
    {
      id: 'agent-005',
      type: 'x402',
      action: 'x402 payment rejected',
      detail: 'Insufficient cUSD amount for Protocol Hoodie — expected 65, received 50',
      timestamp: '2026-03-24T22:00:00Z',
    },
  ]

  return NextResponse.json({ activity })
}

export async function POST(request: Request) {
  try {
    const { storeEns, orderId, txHash } = (await request.json()) as {
      storeEns: string
      orderId: string
      txHash: string
    }

    return NextResponse.json({
      success: true,
      message: `Order ${orderId} for ${storeEns} confirmed`,
      celoscanUrl: `https://celoscan.io/tx/${txHash}`,
      processedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
