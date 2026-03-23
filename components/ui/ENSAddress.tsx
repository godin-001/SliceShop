interface ENSAddressProps {
  ensName?: string;
  address: string;
  className?: string;
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function ENSAddress({ ensName, address, className }: ENSAddressProps) {
  if (ensName) {
    return (
      <span
        className={className}
        style={{
          fontFamily: '"DM Mono", monospace',
          color: '#22c55e',
        }}
      >
        {ensName}
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{
        fontFamily: '"DM Mono", monospace',
        color: 'rgba(255,255,255,0.6)',
      }}
    >
      {truncateAddress(address)}
    </span>
  );
}
