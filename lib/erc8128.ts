export interface ERC8128Message {
  domain: string
  address: string
  statement: string
  uri: string
  version: string
  chainId: number
  nonce: string
  issuedAt: string
  expirationTime: string
}

/**
 * Build an ERC-8128 sign-in message.
 * The domain and URI are resolved dynamically from window.location.host
 * so MetaMask doesn't flag a domain mismatch.
 */
export function buildERC8128Message(
  address: string,
  nonce: string,
  domain?: string
): ERC8128Message {
  // Prefer the passed-in domain, then window.location.host (client), then fallback
  const host =
    domain ??
    (typeof window !== 'undefined'
      ? window.location.host
      : 'sliceshop-phi.vercel.app')

  const uri = `https://${host}`
  const now = new Date()
  const expiration = new Date(now.getTime() + 86400000) // 24 hours

  return {
    domain: host,
    address,
    statement: 'Sign in to SliceShop — your onchain commerce platform.',
    uri,
    version: '1',
    chainId: 42220,
    nonce,
    issuedAt: now.toISOString(),
    expirationTime: expiration.toISOString(),
  }
}

export function formatERC8128MessageForDisplay(msg: ERC8128Message): string {
  return [
    `${msg.domain} wants you to sign in with your Ethereum account:`,
    msg.address,
    '',
    msg.statement,
    '',
    `URI: ${msg.uri}`,
    `Version: ${msg.version}`,
    `Chain ID: ${msg.chainId}`,
    `Nonce: ${msg.nonce}`,
    `Issued At: ${msg.issuedAt}`,
    `Expiration Time: ${msg.expirationTime}`,
  ].join('\n')
}

export function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

export function serializeForSigning(msg: ERC8128Message): string {
  return formatERC8128MessageForDisplay(msg)
}
