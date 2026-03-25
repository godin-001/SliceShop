import { NextResponse } from 'next/server'
import { verifyMessage } from 'viem'
import { serializeForSigning } from '@/lib/erc8128'
import type { ERC8128Message } from '@/lib/erc8128'

export async function POST(request: Request) {
  try {
    const { message, signature, address } = (await request.json()) as {
      message: ERC8128Message
      signature: `0x${string}`
      address: `0x${string}`
    }

    // Reconstruct the message string
    const messageString = serializeForSigning(message)

    // Verify signature
    const valid = await verifyMessage({
      address,
      message: messageString,
      signature,
    })

    if (!valid) {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 })
    }

    // Check expiration
    const expiration = new Date(message.expirationTime)
    if (expiration < new Date()) {
      return NextResponse.json({ success: false, error: 'Message expired' }, { status: 401 })
    }

    // Generate a simple session token
    const token = crypto.randomUUID()

    return NextResponse.json({
      success: true,
      token,
      address,
    })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Internal error' },
      { status: 500 }
    )
  }
}
