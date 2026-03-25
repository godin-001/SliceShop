import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1a1a1a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <span style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.375rem',
              fontWeight: 700,
              color: '#f97316',
              display: 'block',
              marginBottom: '0.5rem',
            }}>
              SliceShop
            </span>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.4)',
              maxWidth: 280,
              lineHeight: 1.6,
            }}>
              Onchain commerce for everyone. ENS stores, stablecoin payments, autonomous agents.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.875rem' }}>
                Platform
              </p>
              {[
                { label: 'Create Store', href: '/create' },
                { label: 'Browse Stores', href: '/store/pixeldrops' },
                { label: 'Sign In', href: '/auth' },
                { label: 'Dashboard', href: '/dashboard' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{
                  display: 'block',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  marginBottom: '0.5rem',
                  cursor: 'crosshair',
                }}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.875rem' }}>
                Built with
              </p>
              {[
                { label: 'Celo', href: 'https://celo.org' },
                { label: 'ENS', href: 'https://ens.domains' },
                { label: 'Slice', href: 'https://slice.so' },
                { label: 'GitHub', href: 'https://github.com/godin-001/SliceShop' },
              ].map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                  display: 'block',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  marginBottom: '0.5rem',
                  cursor: 'crosshair',
                }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.25)' }}>
            © 2026 SliceShop — Built for The Synthesis Hackathon
          </span>
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.25)' }}>
            Slice · Celo · ENS · ERC-8128 · x402
          </span>
        </div>
      </div>
    </footer>
  )
}
