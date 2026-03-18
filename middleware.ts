import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COMING_SOON = true

export function middleware(request: NextRequest) {
  if (!COMING_SOON) return NextResponse.next()

  const path = request.nextUrl.pathname

  // Allow: home page, studio, static assets, API routes, images
  if (
    path === '/' ||
    path.startsWith('/studio') ||
    path.startsWith('/_next') ||
    path.startsWith('/api')
  ) {
    return NextResponse.next()
  }

  // Redirect everything else to home
  return NextResponse.redirect(new URL('/', request.url))
}
