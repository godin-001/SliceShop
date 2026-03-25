import { NextResponse } from 'next/server'
import { verifyX402Payment, createX402PaymentRequest } from '@/lib/x402'

const STORE_WALLET = '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18'
const CONTENT_PRICE = 25

export async function GET(request: Request) {
  const paymentHeader = request.headers.get('X-Payment')

  if (!paymentHeader) {
    const paymentRequest = createX402PaymentRequest(CONTENT_PRICE, STORE_WALLET, 'premium-content')

    return NextResponse.json(
      {
        error: 'Payment required',
        paymentRequest,
      },
      {
        status: 402,
        headers: {
          'X-Payment-Request': btoa(JSON.stringify(paymentRequest)),
        },
      }
    )
  }

  const result = verifyX402Payment(paymentHeader, CONTENT_PRICE, STORE_WALLET)

  if (!result.valid) {
    return NextResponse.json(
      { error: result.reason },
      { status: 402 }
    )
  }

  return NextResponse.json({
    success: true,
    content: {
      message: 'Access granted via x402 payment protocol',
      data: 'Premium content unlocked',
      paidAmount: result.payment?.amount,
      txHash: result.payment?.txHash,
    },
  })
}
