import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth && (req.auth as any).error !== "AccessTokenExpired";

  const pathname = req.nextUrl.pathname.replace(/^\/casdu_cdm/, '') || '/';
  
  const isApiAuthRoute = pathname.startsWith('/api/auth');
  const isDownloadsRoute = pathname.startsWith('/downloads');
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/login';

  if (isApiAuthRoute) {
    return;
  }

  if (isLoginRoute) {
    if (isLoggedIn) {
      // If the session expired on the backend, let them hit the login page to clear NextAuth cookies
      if (nextUrl.searchParams.get('expired') === 'true') {
        return;
      }
      return NextResponse.redirect(new URL('/casdu_cdm/admin/documents', nextUrl));
    }
    return;
  }

  if (isAdminRoute || isDownloadsRoute) {
    if (!isLoggedIn) {
      let callbackUrl = pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      
      if (req.auth && (req.auth as any).error === "AccessTokenExpired") {
        return NextResponse.redirect(new URL(`/casdu_cdm/login?expired=true&callbackUrl=${encodedCallbackUrl}`, nextUrl));
      }
      return NextResponse.redirect(new URL(`/casdu_cdm/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    if (pathname === '/admin') {
      return NextResponse.redirect(new URL('/casdu_cdm/admin/documents', nextUrl));
    }
  }

  return;
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};