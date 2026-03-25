import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect /dashboard → /dashboard/demo-store
  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard/demo-store', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard'],
}
