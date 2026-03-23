'use client';

import { ChangeEvent } from 'react';

interface WalletInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  autoFilled?: boolean;
}

function isValidAddress(value: string): boolean {
  return value.startsWith('0x') && value.length === 42;
}

export default function WalletInput({ value, onChange, label, autoFilled }: WalletInputProps) {
  const valid = isValidAddress(value);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="text-xs uppercase text-white/50"
          style={{
            fontFamily: '"DM Mono", monospace',
            letterSpacing: '0.1em',
          }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="0x..."
          className="w-full px-3 py-2.5 text-sm text-white/90 placeholder-white/20 outline-none focus:ring-1 focus:ring-white/20"
          style={{
            fontFamily: '"DM Mono", monospace',
            backgroundColor: autoFilled ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.03)',
            border: '0.5px solid rgba(255,255,255,0.08)',
            cursor: 'crosshair',
          }}
        />
        {valid && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: '#22c55e' }}
          >
            &#10003;
          </span>
        )}
      </div>
    </div>
  );
}
