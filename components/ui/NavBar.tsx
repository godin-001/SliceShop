'use client';

import Link from 'next/link';
import { ConnectKitButton } from 'connectkit';

export default function NavBar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        backgroundColor: '#0a0a0a',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      <Link
        href="/"
        className="text-xl font-bold tracking-tight"
        style={{
          fontFamily: '"Syne", sans-serif',
          color: '#22c55e',
          cursor: 'crosshair',
        }}
      >
        SliceShop
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/create"
          className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            cursor: 'crosshair',
          }}
        >
          Create Store
        </Link>
        <Link
          href="/dashboard"
          className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
            cursor: 'crosshair',
          }}
        >
          Dashboard
        </Link>
        <ConnectKitButton />
      </div>
    </nav>
  );
}
