import { PATH } from '@/constants/path';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = [PATH.LANDING, PATH.LOGIN];
const GUEST_ONLY_PATHS = [PATH.LANDING, PATH.LOGIN, PATH.SIGN_UP];

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  // OAuth 콜백은 무조건 통과
  if (pathname === PATH.AUTH_CALLBACK) {
    return NextResponse.next();
  }

  const isLoggedIn = !!req.auth;
  const isRegistered = req.cookies.get('is_registered')?.value === 'true';
  const hasRefreshToken = req.cookies.has('refresh_token');

  // 로그인 검증 (세션과 리프레시 토큰 둘 다 있어야 완전한 로그인으로 간주)
  if (!isLoggedIn || !hasRefreshToken) {
    if (PUBLIC_PATHS.includes(pathname)) {
      return NextResponse.next();
    }

    const isExpired = isLoggedIn !== hasRefreshToken;
    const redirectUrl = new URL(PATH.LOGIN, nextUrl);

    if (isExpired) {
      redirectUrl.searchParams.set('expired', 'true');
    }

    return NextResponse.redirect(redirectUrl);
  }

  // 회원가입 미완료 유저 처리
  if (!isRegistered) {
    if (pathname === PATH.SIGN_UP) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(PATH.SIGN_UP, nextUrl));
  }

  // 회원가입 완료 유저 처리
  if (GUEST_ONLY_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL(PATH.STUDY.HOME, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
