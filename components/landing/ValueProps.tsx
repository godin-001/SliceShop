'use client'

const cards = [
  {
    icon: '🌐',
    title: 'Your ENS, your store',
    description: 'yourname.sliceshop.eth',
  },
  {
    icon: '💚',
    title: 'Paid in stablecoins',
    description: 'cUSD direct to your wallet on Celo',
  },
  {
    icon: '🤖',
    title: 'Agent handles orders',
    description: 'Autonomous confirmation and fulfillment',
  },
]

export default function ValueProps() {
  return (
    <section style={{ padding: '5rem 1.5rem', maxWidth: '72rem', margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '0.75rem',
              padding: '2rem',
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{card.icon}</div>
            <h3
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: '0.5rem',
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.9375rem',
                color: '#71717a',
                lineHeight: 1.6,
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
