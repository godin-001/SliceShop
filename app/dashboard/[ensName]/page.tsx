'use client'

import { useParams } from 'next/navigation'
import { useStore } from '@/hooks/useStore'
import { sampleOrders, sampleAgentActions } from '@/lib/mock-data'
import { chaosCasing } from '@/lib/utils'
import MetricCards from '@/components/dashboard/MetricCards'
import OrdersTable from '@/components/dashboard/OrdersTable'
import ProductsManager from '@/components/dashboard/ProductsManager'
import AgentActivityLog from '@/components/dashboard/AgentActivityLog'

export default function DashboardPage() {
  const params = useParams()
  const ensName = params.ensName as string
  const { store, loading } = useStore(ensName)

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <p className="font-[family-name:var(--font-dm-mono)] text-white/30 text-sm uppercase tracking-[0.1em] animate-pulse">
          Loading dashboard...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="font-[family-name:var(--font-dm-mono)] text-sm text-white/40 mb-2">
            {store.ensName || `${decodeURIComponent(ensName)}.sliceshop.eth`} — Dashboard
          </p>
          <h1 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold">
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
          <p className="font-[family-name:var(--font-dm-mono)] text-xs text-white/30 uppercase tracking-[0.1em] mb-4">
            [01] — Orders
          </p>
          <OrdersTable orders={sampleOrders} />
        </section>

        {/* Products + Agent Log side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <section>
            <p className="font-[family-name:var(--font-dm-mono)] text-xs text-white/30 uppercase tracking-[0.1em] mb-4">
              [02] — Products
            </p>
            <ProductsManager products={store.products} />
          </section>

          <section>
            <p className="font-[family-name:var(--font-dm-mono)] text-xs text-white/30 uppercase tracking-[0.1em] mb-4">
              [03] — Agent activity
            </p>
            <AgentActivityLog actions={sampleAgentActions} />
          </section>
        </div>
      </div>
    </div>
  )
}
