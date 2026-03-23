interface StatusPillProps {
  status: 'confirmed' | 'pending' | 'fulfilled';
}

const statusStyles: Record<StatusPillProps['status'], { bg: string; text: string }> = {
  confirmed: { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' },
  pending: { bg: 'rgba(234,179,8,0.15)', text: '#eab308' },
  fulfilled: { bg: 'rgba(167,139,250,0.15)', text: '#a78bfa' },
};

export default function StatusPill({ status }: StatusPillProps) {
  const { bg, text } = statusStyles[status];

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs uppercase"
      style={{
        fontFamily: '"DM Mono", monospace',
        letterSpacing: '0.1em',
        backgroundColor: bg,
        color: text,
      }}
    >
      {status}
    </span>
  );
}
