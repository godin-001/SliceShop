export default function Footer() {
  return (
    <footer
      className="w-full px-6 py-8 flex flex-col items-center gap-2"
      style={{
        backgroundColor: '#0a0a0a',
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      <span
        className="text-lg font-bold"
        style={{
          fontFamily: '"Syne", sans-serif',
          color: '#22c55e',
        }}
      >
        SliceShop
      </span>
      <span
        className="text-xs text-white/40"
        style={{ fontFamily: '"DM Mono", monospace' }}
      >
        Powered by Slice &middot; Celo &middot; ENS
      </span>
      <span
        className="text-xs text-white/25"
        style={{ fontFamily: '"DM Mono", monospace' }}
      >
        &copy; 2026
      </span>
    </footer>
  );
}
