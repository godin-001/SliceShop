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

export function buildERC8128Message(address: string, nonce: string): ERC8128Message {
  const now = new Date()
  const expiration = new Date(now.getTime() + 30 * 60 * 1000) // 30 minutes

  return {
    domain: 'sliceshop.eth',
    address,
    statement: 'Sign in to SliceShop with ERC-8128 authentication.',
    uri: 'https://sliceshop.eth',
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
