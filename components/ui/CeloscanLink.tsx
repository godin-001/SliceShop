'use client'

interface CeloscanLinkProps {
  txHash: string
  short?: boolean
}

export default function CeloscanLink({ txHash, short = true }: CeloscanLinkProps) {
  const display = short
    ? `${txHash.slice(0, 6)}…${txHash.slice(-4)}`
    : txHash

  return (
    <a
      href={`https://celoscan.io/tx/${txHash}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: '"IBM Plex Mono", monospace',
        color: '#16a34a',
        fontSize: '0.8125rem',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
    >
      {display}
    </a>
  )
}
