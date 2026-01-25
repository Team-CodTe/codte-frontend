import { API_URLS } from '@/api/apiUrls';
import { PATH } from '@/constants/path';
import { triggerSessionUpdate } from '@/lib/authSessionSync';

const API_TIMEOUT_MS = 15000; // 15초
const REFRESH_TIMEOUT_MS = 15000; // 15초
const BASE_URL =
  typeof window === 'undefined'
    ? process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig extends Omit<RequestInit, 'method' | 'body'> {
  timeout?: number;
  next?: NextFetchRequestConfig;
}

export class FetchError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.data = data;
  }
}

// SSR 환경에서 JWT 쿠키만 추출하는 헬퍼 함수
const getAuthCookieString = async (): Promise<string> => {
  if (typeof window !== 'undefined') return ''; // 클라이언트는 브라우저가 알아서 처리

  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('access_token');
    const refreshToken = cookieStore.get('refresh_token');

    const cookieParts: string[] = [];

    if (accessToken) {
      cookieParts.push(`access_token=${accessToken.value}`);
    }

    if (refreshToken) {
      cookieParts.push(`refresh_token=${refreshToken.value}`);
    }

    return cookieParts.join('; ');
  } catch {
    return '';
  }
};

// 유틸리티 함수
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number,
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // 외부에서 전달된 signal이 있다면, 그 signal이 abort 될 때 우리 controller도 abort 시킴
  if (options.signal) {
    options.signal.addEventListener(
      'abort',
      () => {
        controller.abort();
      },
      { once: true },
    );
  }

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

// 토큰 갱신 로직
const tokenRefresh = async (): Promise<void> => {
  // 리프레시 요청은 별도의 긴 타임아웃 적용
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REFRESH_TIMEOUT_MS);

  try {
    console.log('🔄 토큰 재발급 시도');

    const headers: HeadersInit = { 'Content-Type': 'application/json' };

    const cookieString = await getAuthCookieString();

    if (cookieString) {
      (headers as Record<string, string>)['Cookie'] = cookieString;
    }

    const response = await fetch(
      new URL(API_URLS.AUTH.REFRESH, BASE_URL).href,
      {
        method: 'POST',
        headers,
        credentials: 'include',
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new FetchError('토큰 갱신에 실패했습니다.', response.status, null);
    }

    await triggerSessionUpdate();

    console.log('✅ 토큰 재발급 성공');
  } catch (error) {
    console.error('🔥 토큰 재발급 실패:', error);

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

// 동시에 여러 401이 터져도 갱신 요청은 한 번만 보내기 위한 Promise
let tokenRefreshPromise: Promise<void> | null = null;

// 메인 Request 함수
const request = async <T>(
  method: RequestMethod,
  url: string,
  data?: unknown,
  config: RequestConfig = {},
  isRetry = false,
): Promise<T> => {
  const { timeout = API_TIMEOUT_MS, ...restConfig } = config;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...restConfig.headers,
  };

  const cookieString = await getAuthCookieString();

  if (cookieString) {
    (headers as Record<string, string>)['Cookie'] = cookieString;
  }

  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
    ...restConfig,
  };

  if (data !== undefined && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetchWithTimeout(
      new URL(url, BASE_URL).href,
      options,
      timeout,
    );

    // 401 Unauthorized 처리
    if (response.status === 401 && !isRetry) {
      // SSR 환경에서는 토큰 갱신 후 브라우저 쿠키 설정을 할 수 없으므로 갱신 시도 안함
      if (typeof window === 'undefined') {
        throw new FetchError('SSR에서 인증 권한이 없습니다.', 401, null);
      }

      const isRefreshCall = url.includes(API_URLS.AUTH.REFRESH);

      // 리프레시 요청 자체가 401 -> 리프레시 토큰도 만료 -> 로그인 페이지
      if (isRefreshCall) {
        if (typeof window !== 'undefined') {
          window.location.href = `${PATH.LOGIN}?expired=true`;
        }

        throw new FetchError('리프레시 토큰이 만료되었습니다.', 401, null);
      }

      // 일반 요청 401 -> 토큰 갱신 시도
      if (!tokenRefreshPromise) {
        tokenRefreshPromise = tokenRefresh().finally(() => {
          tokenRefreshPromise = null; // 성공하든 실패하든 Promise 초기화
        });
      }

      // 다른 요청들은 여기서 대기함
      try {
        await tokenRefreshPromise;
      } catch (error) {
        // 리프레시 실패 시, 대기하던 요청들도 에러 처리 혹은 로그인 페이지로 보냄
        if (typeof window !== 'undefined') {
          window.location.href = `${PATH.LOGIN}?expired=true`;
        }

        throw error;
      }

      // 토큰 갱신 성공 -> 원래 요청 재시도
      return request<T>(method, url, data, config, true);
    }

    // 기타 에러 응답 처리
    if (!response.ok) {
      let errorData: unknown = null;

      try {
        errorData = await response.json();
      } catch {
        // JSON 파싱 실패 시 무시
      }

      throw new FetchError(
        `요청 처리에 실패했습니다.`,
        response.status,
        errorData,
      );
    }

    // 성공 응답 처리 (빈 응답 대응)
    const contentLength = response.headers.get('Content-Length');

    if (response.status === 204 || contentLength === '0') {
      return undefined as T;
    }

    const text = await response.text();

    if (!text) {
      return undefined as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    // 요청 시간 초과 혹은 수동 취소
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('요청이 중단되었습니다. (시간 초과 또는 사용자 취소)');
    }

    throw error;
  }
};

// 인스턴스 내보내기
export const customFetch = {
  get: <T>(url: string, config?: RequestConfig) =>
    request<T>('GET', url, undefined, config),

  post: <T>(url: string, data?: unknown, config?: RequestConfig) =>
    request<T>('POST', url, data, config),

  put: <T>(url: string, data?: unknown, config?: RequestConfig) =>
    request<T>('PUT', url, data, config),

  patch: <T>(url: string, data?: unknown, config?: RequestConfig) =>
    request<T>('PATCH', url, data, config),

  delete: <T>(url: string, config?: RequestConfig) =>
    request<T>('DELETE', url, undefined, config),
};
