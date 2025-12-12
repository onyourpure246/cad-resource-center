import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'



const isProtectedRoute = createRouteMatcher(
  [
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/downloads(.*)',
    '/admin(.*)',
  ],
) // Corrected closing brace for createRouteMatcher

export default clerkMiddleware(async (auth, req) => {
  // 1. Protect routes that require authentication
  if (isProtectedRoute(req)) await auth.protect()

  if (req.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/documents', req.url))
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}