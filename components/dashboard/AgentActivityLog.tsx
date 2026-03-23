'use client'

import { AgentAction } from '@/lib/mock-data'

interface AgentActivityLogProps {
  actions: AgentAction[]
}

const dotColors: Record<AgentAction['type'], string> = {
  order: '#22c55e',
  ens: '#a78bfa',
  alert: '#eab308',
  system: '#6b7280',
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
        backgroundColor: '#111',
        border: '0.5px solid rgba(255,255,255,0.08)',
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
            borderBottom: index < actions.length - 1 ? '0.5px solid rgba(255,255,255,0.08)' : 'none',
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {action.action}
              </span>
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.6875rem',
                  color: 'rgba(255,255,255,0.3)',
                  flexShrink: 0,
                }}
              >
                {relativeTime(action.timestamp)}
              </span>
            </div>
            <span
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.4,
              }}
            >
              {action.detail}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
