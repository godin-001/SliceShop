'use client'

interface MetricCardsProps {
  totalRevenue: number
  ordersCount: number
  activeProducts: number
  visitors: number
}

interface MetricCardData {
  label: string
  value: string
  indicator: string
}

export default function MetricCards({ totalRevenue, ordersCount, activeProducts, visitors }: MetricCardsProps) {
  const metrics: MetricCardData[] = [
    { label: 'Total Revenue', value: `$${totalRevenue} cUSD`, indicator: '\u25B2' },
    { label: 'Orders', value: String(ordersCount), indicator: '\u25CF' },
    { label: 'Active Products', value: String(activeProducts), indicator: '\u25A0' },
    { label: 'Visitors', value: visitors.toLocaleString(), indicator: '\u25C6' },
  ]

  return (
    <>
      <style>{`
        @media (min-width: 640px) {
          [data-metric-grid] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          [data-metric-grid] {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
      <div
        data-metric-grid
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1px',
          backgroundColor: 'rgba(255,255,255,0.08)',
        }}
      >
        {metrics.map((metric) => (
          <div
            key={metric.label}
            style={{
              backgroundColor: '#111',
              border: '0.5px solid rgba(255,255,255,0.08)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {metric.label}
              </span>
              <span style={{ color: '#22c55e', fontSize: '0.75rem' }}>{metric.indicator}</span>
            </div>
            <span
              style={{
                fontFamily: '"Syne", sans-serif',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
