import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

import { PATH } from './constants/path';

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  if (pathname === PATH.AUTH_CALLBACK) {
    return NextResponse.next();
  }

  const isLoggedIn = !!req.auth;
  const isRegistered = req.cookies.get('is_registered')?.value === 'true';

  const publicPaths = [PATH.HOME, PATH.LOGIN];
  const authRestrictedPaths = [PATH.HOME, PATH.LOGIN, PATH.SIGN_UP];

  // 로그인 하지 않은 유저
  if (!isLoggedIn) {
    if (publicPaths.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(PATH.LOGIN, nextUrl));
  }

  // 회원가입 하지 않은 유저
  if (!isRegistered) {
    if (pathname === PATH.SIGN_UP) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(PATH.SIGN_UP, nextUrl));
  }

  // 로그인 & 회원가입한 유저
  if (authRestrictedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL(PATH.STUDY, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
