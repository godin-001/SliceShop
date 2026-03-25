'use client';

import Link from 'next/link';
import { ConnectKitButton } from 'connectkit';
import { useERC8128 } from '@/hooks/useERC8128';

export default function NavBar() {
  const { isAuthenticated, session, signOut } = useERC8128();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <Link
        href="/"
        className="text-xl font-bold tracking-tight"
        style={{
          fontFamily: '"Playfair Display", serif',
          color: '#f97316',
          cursor: 'crosshair',
        }}
      >
        SliceShop
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/create"
          className="text-xs uppercase tracking-widest transition-colors"
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            letterSpacing: '0.1em',
            color: '#71717a',
            cursor: 'crosshair',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#71717a')}
        >
          Create Store
        </Link>
        <Link
          href="/dashboard"
          className="text-xs uppercase tracking-widest transition-colors"
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            letterSpacing: '0.1em',
            color: '#71717a',
            cursor: 'crosshair',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#71717a')}
        >
          Dashboard
        </Link>

        {isAuthenticated && session ? (
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.6875rem',
                color: '#16a34a',
              }}
            >
              {session.address.slice(0, 6)}…{session.address.slice(-4)}
            </span>
            <button
              onClick={signOut}
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.6875rem',
                color: '#71717a',
                background: 'none',
                border: 'none',
                cursor: 'crosshair',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#71717a')}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/auth"
            className="text-xs uppercase tracking-widest transition-colors"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              letterSpacing: '0.1em',
              color: '#f97316',
              cursor: 'crosshair',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ea580c')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#f97316')}
          >
            Sign In
          </Link>
        )}

        <ConnectKitButton />
      </div>
    </nav>
  );
}
