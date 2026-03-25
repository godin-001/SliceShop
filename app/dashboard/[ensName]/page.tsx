'use client'

import { useParams } from 'next/navigation'
import { useStore } from '@/hooks/useStore'
import { sampleOrders, sampleAgentActions } from '@/lib/mock-data'
import { chaosCasing } from '@/lib/utils'
import { useERC8128 } from '@/hooks/useERC8128'
import MetricCards from '@/components/dashboard/MetricCards'
import OrdersTable from '@/components/dashboard/OrdersTable'
import ProductsManager from '@/components/dashboard/ProductsManager'
import AgentActivityLog from '@/components/dashboard/AgentActivityLog'
import PaymentHistory from '@/components/dashboard/PaymentHistory'

export default function DashboardPage() {
  const params = useParams()
  const ensName = params.ensName as string
  const { store, loading } = useStore(ensName)
  const { isAuthenticated, session } = useERC8128()

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: '#71717a',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
          className="animate-pulse"
        >
          Loading dashboard...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#fafaf8' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* ERC-8128 Session Banner */}
        {isAuthenticated && session && (
          <div
            style={{
              backgroundColor: '#fff7ed',
              border: '1px solid #fed7aa',
              borderRadius: '0.75rem',
              padding: '0.875rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: '#ffffff',
                backgroundColor: '#f97316',
                padding: '0.1875rem 0.625rem',
                borderRadius: '9999px',
              }}
            >
              ERC-8128
            </span>
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.8125rem',
                color: '#9a3412',
              }}
            >
              Authenticated as{' '}
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>
                {session.address.slice(0, 6)}…{session.address.slice(-4)}
              </span>
            </span>
          </div>
        )}

        {/* Header */}
        <div className="mb-10">
          <p
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.8125rem',
              color: '#71717a',
              marginBottom: '0.5rem',
            }}
          >
            {store.ensName || `${decodeURIComponent(ensName)}.sliceshop.eth`} — Dashboard
          </p>
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            {chaosCasing(store.name)}
          </h1>
        </div>

        {/* Metrics */}
        <MetricCards
          totalRevenue={store.totalRevenue}
          ordersCount={sampleOrders.length}
          activeProducts={store.products.filter((p) => p.active).length}
          visitors={store.visitors}
        />

        {/* Orders */}
        <section className="mt-12">
          <p
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.6875rem',
              color: '#71717a',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            [01] — Orders
          </p>
          <OrdersTable orders={sampleOrders} />
        </section>

        {/* Products + Agent Log side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <section>
            <p
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.6875rem',
                color: '#71717a',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              [02] — Products
            </p>
            <ProductsManager products={store.products} />
          </section>

          <section>
            <p
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.6875rem',
                color: '#71717a',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              [03] — Agent activity
            </p>
            <AgentActivityLog actions={sampleAgentActions} />
          </section>
        </div>

        {/* Payment History */}
        <section className="mt-12">
          <p
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.6875rem',
              color: '#71717a',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            [04] — Payment history
          </p>
          <PaymentHistory />
        </section>
      </div>
    </div>
  )
}
