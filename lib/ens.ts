export const SLICESHOP_DOMAIN = 'sliceshop.eth'

export function toSubdomain(storeName: string): string {
  return `${storeName.toLowerCase().replace(/[^a-z0-9]/g, '')}.${SLICESHOP_DOMAIN}`
}

export function formatAddress(address: string, chars = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function formatENSOrAddress(ensName: string | null | undefined, address: string): string {
  return ensName || formatAddress(address)
}
