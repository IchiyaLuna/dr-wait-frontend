import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const allowedPaths = [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/search/hospital/list',
  ];

  if (!req.auth && !allowedPaths.includes(req.nextUrl.pathname)) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
