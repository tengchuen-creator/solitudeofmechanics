import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COMING_SOON = true

export function middleware(request: NextRequest) {
  if (!COMING_SOON) return NextResponse.next()

  const path = request.nextUrl.pathname

  // Allow: home page, studio (CMS), static assets, API routes
  if (
    path === '/' ||
    path.startsWith('/studio') ||
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.includes('.')
  ) {
    return NextResponse.next()
  }

  // Block everything else — redirect to home
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
