import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
  const isDownloadsRoute = nextUrl.pathname.startsWith('/downloads');
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = nextUrl.pathname === '/login';

  if (isApiAuthRoute) {
    return;
  }

  if (isLoginRoute) {
    if (isLoggedIn) {
      // If the session expired on the backend, let them hit the login page to clear NextAuth cookies
      if (nextUrl.searchParams.get('expired') === 'true') {
        return;
      }
      return NextResponse.redirect(new URL('/admin/documents', nextUrl));
    }
    return;
  }

  if (isAdminRoute || isDownloadsRoute) {
    if (!isLoggedIn) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    if (nextUrl.pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/documents', nextUrl));
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