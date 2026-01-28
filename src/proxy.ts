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
const GUEST_PATHS: string[] = [PATH.LOGIN, PATH.SIGN_UP];
const UNREGISTERED_ALLOWED_PATHS: string[] = [PATH.SIGN_UP, PATH.LANDING];

const BASE_URL = process.env.API_BASE_URL;

export const proxy = auth(async (req) => {
  const { nextUrl, auth: session } = req;
  const { pathname } = nextUrl;

  let newCookies: string[] = [];
  const requestHeaders = new Headers(req.headers);

  const createResponse = (destination?: string | URL) => {
    const response = destination
      ? NextResponse.redirect(new URL(destination, nextUrl))
      : NextResponse.next({ request: { headers: requestHeaders } });

    if (newCookies.length > 0) {
      newCookies.forEach((cookieStr) =>
        response.headers.append('Set-Cookie', cookieStr),
      );
    }

    return response;
  };

  const redirectToLoginExpired = () => {
    const loginUrl = new URL(PATH.LOGIN, nextUrl);

    loginUrl.searchParams.set('expired', 'true');

    const response = createResponse(loginUrl);

    response.cookies.delete(COOKIE_KEYS.ACCESS_TOKEN);
    response.cookies.delete(COOKIE_KEYS.REFRESH_TOKEN);
    response.cookies.delete(COOKIE_KEYS.IS_REGISTERED);

    return response;
  };

  if (pathname === PATH.AUTH_CALLBACK) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;
  const accessToken = req.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
  const isRegistered =
    req.cookies.get(COOKIE_KEYS.IS_REGISTERED)?.value === 'true';

  const isAuthenticated = !!session && !!refreshToken;
  const needsTokenRefresh = isAuthenticated && !accessToken;

  // 미인증자가 공개 페이지 접근 시 통과
  if (!isAuthenticated && PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // 액세스 토큰 만료 시 리프레시 토큰으로 재발급
  if (needsTokenRefresh) {
    try {
      const refreshResponse = await fetch(
        `${BASE_URL}${API_URLS.AUTH.REFRESH}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `${COOKIE_KEYS.REFRESH_TOKEN}=${refreshToken}`,
          },
        },
      );

      if (!refreshResponse.ok) {
        throw new Error('리프레시 토큰 재발급 실패');
      }

      const setCookieHeader = refreshResponse.headers.getSetCookie();

      if (setCookieHeader?.length > 0) {
        newCookies = setCookieHeader;
        requestHeaders.set('Cookie', newCookies.join('; '));
      }
    } catch (error) {
      console.error('[Proxy] 리프레시 토큰 재발급 실패:', error);

      return redirectToLoginExpired();
    }
  }

  // 미인증 유저 처리
  if (!isAuthenticated) {
    if (ALWAYS_ALLOWED_PATHS.includes(pathname)) {
      return createResponse();
    }

    // 세션 불일치 시 만료 처리
    if (!!session !== !!refreshToken) {
      return redirectToLoginExpired();
    }

    return createResponse(PATH.LOGIN);
  }

  // 회원가입 미완료 유저 처리
  if (!isRegistered) {
    if (!UNREGISTERED_ALLOWED_PATHS.includes(pathname)) {
      return createResponse(PATH.SIGN_UP);
    }

    return createResponse();
  }

  // 가입 완료 유저 게스트 페이지 접근 시 대시보드로 리다이렉트
  if (GUEST_PATHS.includes(pathname)) {
    return createResponse(PATH.DASHBOARD);
  }

  return createResponse();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.mp4$).*)',
  ],
};
