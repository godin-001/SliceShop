'use client'

import { Order } from '@/lib/mock-data'
import StatusPill from '@/components/ui/StatusPill'
import { formatDate, truncateHash, formatCurrency } from '@/lib/utils'
import { CELOSCAN_TX_URL } from '@/lib/celo'

interface OrdersTableProps {
  orders: Order[]
}

const headerStyle: React.CSSProperties = {
  fontFamily: '"DM Mono", monospace',
  fontSize: '0.6875rem',
  color: 'rgba(255,255,255,0.4)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  padding: '0.75rem 1rem',
  textAlign: 'left',
  borderBottom: '0.5px solid rgba(255,255,255,0.08)',
  whiteSpace: 'nowrap',
}

const cellStyle: React.CSSProperties = {
  fontFamily: '"DM Mono", monospace',
  fontSize: '0.8125rem',
  color: 'rgba(255,255,255,0.8)',
  padding: '0.75rem 1rem',
  borderBottom: '0.5px solid rgba(255,255,255,0.08)',
  whiteSpace: 'nowrap',
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#111',
          border: '0.5px solid rgba(255,255,255,0.08)',
        }}
      >
        <thead>
          <tr>
            <th style={headerStyle}>ID</th>
            <th style={headerStyle}>Product</th>
            <th style={headerStyle}>Amount</th>
            <th style={headerStyle}>Buyer</th>
            <th style={headerStyle}>Status</th>
            <th style={headerStyle}>Tx Hash</th>
            <th style={headerStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={cellStyle}>{order.id}</td>
              <td style={{ ...cellStyle, color: '#fff' }}>{order.productName}</td>
              <td style={cellStyle}>{formatCurrency(order.amount)} {order.currency}</td>
              <td style={cellStyle}>
                {order.buyerENS ? (
                  <span style={{ color: '#a78bfa' }}>{order.buyerENS}</span>
                ) : (
                  truncateHash(order.buyerAddress)
                )}
              </td>
              <td style={cellStyle}>
                <StatusPill status={order.status} />
              </td>
              <td style={cellStyle}>
                <a
                  href={CELOSCAN_TX_URL(order.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#a78bfa',
                    textDecoration: 'none',
                    cursor: 'crosshair',
                  }}
                >
                  {truncateHash(order.txHash)}
                </a>
              </td>
              <td style={{ ...cellStyle, color: 'rgba(255,255,255,0.4)' }}>{formatDate(order.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
