import { API_URLS } from '@/api/apiUrls';
import { PATH } from '@/constants/path';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

const ALWAYS_ALLOWED_PATHS: string[] = [
  PATH.TERMS_OF_SERVICE,
  PATH.PRIVACY_POLICY,
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
  const refreshToken = req.cookies.get('refresh_token');
  const accessToken = req.cookies.get('access_token');
  const isRegistered = req.cookies.get('is_registered')?.value === 'true';
  const isLoggedIn = !!req.auth;

  // 토큰 갱신 로직 (Access Token 만료 & Refresh Token 존재 시)
  let newCookies: string[] = [];
  const updatedRequestHeaders = new Headers(req.headers);

  if (refreshToken && !accessToken) {
    try {
      const refreshResponse = await fetch(
        `${BASE_URL}${API_URLS.AUTH.REFRESH}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `refresh_token=${refreshToken.value}`,
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
        // 갱신 실패 시(리프레시 토큰 만료 등), 로그아웃 처리 등을 위해 그대로 둠
        console.warn('[ Proxy ]: 토큰 재발급 실패');
      }
    } catch (error) {
      console.error('[ Proxy ]: 토큰 재발급 에러', error);
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
