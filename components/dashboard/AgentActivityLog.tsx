'use client'

import { AgentAction } from '@/lib/mock-data'
import CeloscanLink from '@/components/ui/CeloscanLink'

interface AgentActivityLogProps {
  actions: AgentAction[]
}

const dotColors: Record<AgentAction['type'], string> = {
  order: '#16a34a',
  ens: '#8b5cf6',
  alert: '#eab308',
  system: '#71717a',
  erc8128: '#f97316',
  x402: '#16a34a',
}

const badgeStyles: Partial<Record<AgentAction['type'], { bg: string; color: string; label: string }>> = {
  erc8128: { bg: '#fff7ed', color: '#f97316', label: 'ERC-8128' },
  x402: { bg: '#f0fdf4', color: '#16a34a', label: 'x402' },
}

function relativeTime(timestamp: string): string {
  const now = new Date()
  const then = new Date(timestamp)
  const diffMs = now.getTime() - then.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffDay > 0) return `${diffDay}d ago`
  if (diffHour > 0) return `${diffHour}h ago`
  if (diffMin > 0) return `${diffMin}m ago`
  return 'just now'
}

export default function AgentActivityLog({ actions }: AgentActivityLogProps) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '0.75rem',
        maxHeight: '28rem',
        overflowY: 'auto',
      }}
    >
      {actions.map((action, index) => (
        <div
          key={action.id}
          style={{
            display: 'flex',
            gap: '0.75rem',
            padding: '0.875rem 1.25rem',
            borderBottom: index < actions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
            alignItems: 'flex-start',
          }}
        >
          {/* Colored dot */}
          <div
            style={{
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              backgroundColor: dotColors[action.type],
              flexShrink: 0,
              marginTop: '0.375rem',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#1a1a1a',
                  }}
                >
                  {action.action}
                </span>
                {badgeStyles[action.type] && (
                  <span
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      color: badgeStyles[action.type]!.color,
                      backgroundColor: badgeStyles[action.type]!.bg,
                      padding: '0.125rem 0.5rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.025em',
                    }}
                  >
                    {badgeStyles[action.type]!.label}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.6875rem',
                  color: '#71717a',
                  flexShrink: 0,
                }}
              >
                {relativeTime(action.timestamp)}
              </span>
            </div>
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.75rem',
                color: '#71717a',
                lineHeight: 1.5,
              }}
            >
              {action.detail}
            </span>
            {action.txHash && (
              <div style={{ marginTop: '0.125rem' }}>
                <CeloscanLink txHash={action.txHash} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
