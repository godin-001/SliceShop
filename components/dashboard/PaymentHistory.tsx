'use client'

import { sampleOrders } from '@/lib/mock-data'
import CeloscanLink from '@/components/ui/CeloscanLink'

export default function PaymentHistory() {
  const total = sampleOrders.reduce((sum, o) => sum + o.amount, 0)

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              {['Tx Hash', 'Product', 'Amount', 'Buyer', 'Date'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '0.875rem 1.25rem',
                    textAlign: 'left',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    color: '#71717a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleOrders.map((order, i) => (
              <tr
                key={order.id}
                style={{
                  borderBottom:
                    i < sampleOrders.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                }}
              >
                <td style={{ padding: '0.75rem 1.25rem' }}>
                  <CeloscanLink txHash={order.txHash} />
                </td>
                <td
                  style={{
                    padding: '0.75rem 1.25rem',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.875rem',
                    color: '#1a1a1a',
                  }}
                >
                  {order.productName}
                </td>
                <td
                  style={{
                    padding: '0.75rem 1.25rem',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#16a34a',
                  }}
                >
                  {order.amount} cUSD
                </td>
                <td
                  style={{
                    padding: '0.75rem 1.25rem',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.875rem',
                    color: '#71717a',
                  }}
                >
                  {order.buyerENS || `${order.buyerAddress.slice(0, 6)}…${order.buyerAddress.slice(-4)}`}
                </td>
                <td
                  style={{
                    padding: '0.75rem 1.25rem',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: '#71717a',
                  }}
                >
                  {new Date(order.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div
        style={{
          borderTop: '1px solid rgba(0,0,0,0.08)',
          padding: '1rem 1.25rem',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.8125rem',
            color: '#71717a',
          }}
        >
          Total
        </span>
        <span
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '1rem',
            fontWeight: 700,
            color: '#16a34a',
          }}
        >
          {total} cUSD
        </span>
      </div>
    </div>
  )
}
