import { defineChain } from 'viem'

export const celo = defineChain({
  id: 42220,
  name: 'Celo',
  nativeCurrency: {
    decimals: 18,
    name: 'CELO',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: { http: ['https://forno.celo.org'] },
  },
  blockExplorers: {
    default: { name: 'Celoscan', url: 'https://celoscan.io' },
  },
})

export const CUSD_ADDRESS = '0x765DE816845861e75A25fCA122bb6898B8B1282a' as const
export const USDC_ADDRESS = '0xcebA9300f2b948710d2653dD7B07f33A8B32118C' as const

export const CELOSCAN_TX_URL = (hash: string) => `https://celoscan.io/tx/${hash}`
export const CELOSCAN_ADDRESS_URL = (addr: string) => `https://celoscan.io/address/${addr}`

export type PaymentCurrency = 'cUSD' | 'USDC' | 'CELO'

export const currencyAddresses: Record<PaymentCurrency, string> = {
  cUSD: CUSD_ADDRESS,
  USDC: USDC_ADDRESS,
  CELO: '0x0000000000000000000000000000000000000000',
}
