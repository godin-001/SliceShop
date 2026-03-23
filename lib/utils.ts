// Chaos-casing: alternate upper/lower on each character
export function chaosCasing(text: string): string {
  let i = 0
  return text
    .split('')
    .map((char) => {
      if (char === ' ' || char === '.' || char === ',' || char === '—') return char
      const result = i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      i++
      return result
    })
    .join('')
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function truncateHash(hash: string, chars = 6): string {
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`
}
