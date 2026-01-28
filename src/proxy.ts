import { API_URLS } from '@/api/apiUrls';
import { PATH } from '@/constants/path';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

import { COOKIE_KEYS } from './constants/cookie';

const ALWAYS_ALLOWED_PATHS: string[] = [
  PATH.TERMS_OF_SERVICE,
  PATH.PRIVACY_POLICY,
  PATH.GOODBYE,
];
const PUBLIC_PATHS: string[] = [
  PATH.LANDING,
  PATH.LOGIN,
  ...ALWAYS_ALLOWED_PATHS,
];
const GUEST_PATHS: string[] = [PATH.LANDING, PATH.LOGIN, PATH.SIGN_UP];
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const proxy = auth(async (req) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  // OAuth 콜백은 무조건 통과
  if (pathname === PATH.AUTH_CALLBACK) {
    return NextResponse.next();
  }

  // 현재 토큰 상태 확인
  const refreshToken = req.cookies.get(COOKIE_KEYS.REFRESH_TOKEN);
  const accessToken = req.cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
  const isRegistered =
    req.cookies.get(COOKIE_KEYS.IS_REGISTERED)?.value === 'true';
  const isLoggedIn = !!req.auth;

  // 토큰 갱신 로직 (Access Token 만료 & Refresh Token 존재 시)
  let newCookies: string[] = [];
  const updatedRequestHeaders = new Headers(req.headers);

  const handleRefreshFailure = () => {
    const redirectUrl = new URL(PATH.LOGIN, nextUrl);

    redirectUrl.searchParams.set('expired', 'true');

    const response = NextResponse.redirect(redirectUrl);

    // 쿠키 삭제
    response.cookies.delete(COOKIE_KEYS.ACCESS_TOKEN);
    response.cookies.delete(COOKIE_KEYS.REFRESH_TOKEN);
    response.cookies.delete(COOKIE_KEYS.IS_REGISTERED);

    return response;
  };

  if (refreshToken && !accessToken) {
    try {
      const refreshResponse = await fetch(
        `${BASE_URL}${API_URLS.AUTH.REFRESH}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `${COOKIE_KEYS.REFRESH_TOKEN}=${refreshToken.value}`,
          },
        },
      );

      if (refreshResponse.ok) {
        const setCookieHeader = refreshResponse.headers.getSetCookie();

        if (setCookieHeader && setCookieHeader.length > 0) {
          newCookies = setCookieHeader;

          updatedRequestHeaders.set('Cookie', newCookies.join('; '));
        }
      } else {
        // 갱신 실패 시(리프레시 토큰 만료 등), 쿠키 삭제 후 로그인 페이지로 리다이렉트
        console.warn('[ Proxy ]: 토큰 재발급 실패');

        return handleRefreshFailure();
      }
    } catch (error) {
      // 네트워크 에러 등으로 갱신 실패 시에도 쿠키 삭제 후 로그인 페이지로 리다이렉트
      console.error('[ Proxy ]: 토큰 재발급 에러', error);

      return handleRefreshFailure();
    }
  }

  // 로그인 검증(세션과 리프레시 토큰 둘 다 있어야 함)
  const hasValidTokenNow = !!accessToken || newCookies.length > 0;

  if (ALWAYS_ALLOWED_PATHS.includes(pathname)) {
    return applyCookies(
      NextResponse.next({
        request: { headers: updatedRequestHeaders },
      }),
      newCookies,
    );
  }

  if (!isLoggedIn || (!refreshToken && !hasValidTokenNow)) {
    if (PUBLIC_PATHS.includes(pathname)) {
      return applyCookies(
        NextResponse.next({
          request: { headers: updatedRequestHeaders },
        }),
        newCookies,
      );
    }

    const isExpired = isLoggedIn !== !!refreshToken;
    const redirectUrl = new URL(PATH.LOGIN, nextUrl);

    if (isExpired) {
      redirectUrl.searchParams.set('expired', 'true');
    }

    return applyCookies(NextResponse.redirect(redirectUrl), newCookies);
  }

  // 회원가입 미완료 유저 처리
  if (!isRegistered) {
    if (pathname === PATH.SIGN_UP) {
      return applyCookies(
        NextResponse.next({
          request: { headers: updatedRequestHeaders },
        }),
        newCookies,
      );
    }

    return applyCookies(
      NextResponse.redirect(new URL(PATH.SIGN_UP, nextUrl)),
      newCookies,
    );
  }

  // 회원가입 완료 유저 처리
  if (GUEST_PATHS.includes(pathname)) {
    return applyCookies(
      NextResponse.redirect(new URL(PATH.DASHBOARD, nextUrl)),
      newCookies,
    );
  }

  return applyCookies(
    NextResponse.next({
      request: {
        headers: updatedRequestHeaders,
      },
    }),
    newCookies,
  );
});

// 응답에 Set-Cookie 헤더를 적용하는 헬퍼 함수
const applyCookies = (response: NextResponse, cookieStrings: string[]) => {
  cookieStrings.forEach((cookieStr) => {
    response.headers.append('Set-Cookie', cookieStr);
  });

  return response;
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.mp4$).*)',
  ],
};
