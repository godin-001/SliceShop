'use client'

import { toSubdomain } from '@/lib/ens'

export function useENS(storeName: string) {
  const subdomain = storeName ? toSubdomain(storeName) : ''
  const isAvailable = storeName.length >= 3

  return { subdomain, isAvailable }
}
