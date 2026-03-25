const CUSD_ADDRESS = '0x765DE816845861e75A25fCA122bb6898B8B1282a'

export interface X402PaymentHeader {
  version: string
  amount: string
  currency: string
  recipient: string
  chainId: number
  token: string
  txHash?: string
}

export interface X402PaymentRequest {
  version: string
  amount: string
  currency: string
  recipient: string
  chainId: number
  token: string
  productId: string
  network: string
  description: string
}

export function parseX402Header(header: string): X402PaymentHeader {
  const decoded = atob(header)
  return JSON.parse(decoded) as X402PaymentHeader
}

export function verifyX402Payment(
  header: string,
  expectedAmount: number,
  recipient: string
): { valid: boolean; reason?: string; payment?: X402PaymentHeader } {
  try {
    const payment = parseX402Header(header)

    if (parseFloat(payment.amount) < expectedAmount) {
      return { valid: false, reason: 'Insufficient payment amount' }
    }

    if (payment.recipient.toLowerCase() !== recipient.toLowerCase()) {
      return { valid: false, reason: 'Recipient mismatch' }
    }

    if (payment.token.toLowerCase() !== CUSD_ADDRESS.toLowerCase()) {
      return { valid: false, reason: 'Invalid payment token — expected cUSD' }
    }

    if (payment.chainId !== 42220) {
      return { valid: false, reason: 'Invalid chain — expected Celo (42220)' }
    }

    return { valid: true, payment }
  } catch {
    return { valid: false, reason: 'Invalid payment header' }
  }
}

export function createX402PaymentRequest(
  amount: number,
  recipient: string,
  productId: string
): X402PaymentRequest {
  return {
    version: '1',
    amount: amount.toString(),
    currency: 'cUSD',
    recipient,
    chainId: 42220,
    token: CUSD_ADDRESS,
    productId,
    network: 'celo',
    description: `Payment of ${amount} cUSD required for access`,
  }
}
