import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

import { PATH } from './constants/path';

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  if (pathname === PATH.AUTH_CALLBACK) {
    return NextResponse.next();
  }

  const isRegisteredCookie = req.cookies.get('is_registered');
  const isRegistered = isRegisteredCookie?.value === 'true';

  // 로그인을 하지 않은 경우 접근 가능한 경로
  const publicPaths = [PATH.HOME, PATH.LOGIN];
  // 로그인 및 회원가입을 마친 유저가 접근 시 리다이렉션될 경로
  const authRestrictedPaths = [PATH.HOME, PATH.LOGIN, PATH.SIGN_UP];

  if (!isLoggedIn) {
    // CASE A: 로그인을 하지 않은 경우
    if (!publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL(PATH.LOGIN, nextUrl));
    }
  } else {
    // 로그인을 한 경우
    if (!isRegistered) {
      // CASE B: 회원가입이 안 된 경우
      if (pathname !== PATH.SIGN_UP) {
        return NextResponse.redirect(new URL(PATH.SIGN_UP, nextUrl));
      }
    } else {
      // CASE C: 회원가입이 완료된 경우
      if (authRestrictedPaths.includes(pathname)) {
        return NextResponse.redirect(new URL(PATH.WELCOME, nextUrl));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
