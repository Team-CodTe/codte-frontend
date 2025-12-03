import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

import { PATH } from './constants/path';

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  if (PATH.AUTH_CALLBACK.includes(pathname)) {
    return NextResponse.next();
  }

  const isRegisteredCookie = req.cookies.get('is_registered');
  const isRegistered = isRegisteredCookie?.value === 'true';

  // CASE A: 로그인을 하지 않은 경우
  if (!isLoggedIn) {
    if (!PATH.HOME.includes(pathname) && !PATH.LOGIN.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', nextUrl));
    }
  }

  // CASE B: 로그인 했지만, 회원가입이 안 된 경우
  if (isLoggedIn && !isRegistered) {
    if (!PATH.SIGN_UP.includes(pathname)) {
      return NextResponse.redirect(new URL('/sign-up', nextUrl));
    }
  }

  // CASE C: 로그인도 했고, 회원가입도 완료된 경우
  if (isLoggedIn && isRegistered) {
    if (
      PATH.HOME.includes(pathname) ||
      PATH.LOGIN.includes(pathname) ||
      PATH.SIGN_UP.includes(pathname)
    ) {
      return NextResponse.redirect(new URL('/welcome', nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
