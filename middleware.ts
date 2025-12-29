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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};