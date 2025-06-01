import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const allowedPaths = [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/search/pharmacy',
    '/search/hospital/list',
    '/search/hospital/**',
  ];

  const isAllowed = allowedPaths.some((allowed) => {
    if (allowed.endsWith('/**')) {
      const base = allowed.replace(/\/\*\*$/, '');
      return pathname.startsWith(base);
    }
    return pathname === allowed;
  });

  if (!req.auth && !isAllowed) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
