import { API_URLS } from '@/api/apiUrls';

const API_TIMEOUT_MS = 5000;
const REFRESH_TIMEOUT_MS = 10000;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

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
const refreshToken = async (): Promise<void> => {
  // 리프레시 요청은 별도의 긴 타임아웃 적용
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REFRESH_TIMEOUT_MS);

  try {
    console.log('🔄 토큰 재발급 시도');

    const response = await fetch(`${BASE_URL}${API_URLS.AUTH.REFRESH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new FetchError('토큰 갱신에 실패했습니다.', response.status, null);
    }

    console.log('✅ 토큰 재발급 성공');
  } catch (error) {
    console.error('🔥 토큰 재발급 실패:', error);

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

// 동시에 여러 401이 터져도 갱신 요청은 한 번만 보내기 위한 Promise
let refreshTokenPromise: Promise<void> | null = null;

// 메인 Request 함수
const request = async <T>(
  method: RequestMethod,
  url: string,
  data?: unknown,
  config: RequestConfig = {},
  isRetry = false,
): Promise<T> => {
  const { timeout = API_TIMEOUT_MS, ...restConfig } = config;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...restConfig.headers,
    },
    credentials: 'include',
    ...restConfig,
  };

  if (data !== undefined && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  const fullUrl = `${BASE_URL}${url}`;

  try {
    const response = await fetchWithTimeout(fullUrl, options, timeout);

    // 401 Unauthorized 처리
    if (response.status === 401 && !isRetry) {
      const isRefreshCall = url.includes(API_URLS.AUTH.REFRESH);

      // 리프레시 요청 자체가 401 -> 리프레시 토큰도 만료 -> 로그인 페이지
      if (isRefreshCall) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        throw new FetchError('리프레시 토큰이 만료되었습니다.', 401, null);
      }

      // 일반 요청 401 -> 토큰 갱신 시도
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken().finally(() => {
          refreshTokenPromise = null; // 성공하든 실패하든 Promise 초기화
        });
      }

      // 다른 요청들은 여기서 대기함
      try {
        await refreshTokenPromise;
      } catch (error) {
        // 리프레시 실패 시, 대기하던 요청들도 에러 처리 혹은 로그인 페이지로 보냄
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
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
