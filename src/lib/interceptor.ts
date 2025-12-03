import { API_URLS } from '@/api/apiUrls';
import {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

const refreshToken = async (instance: AxiosInstance): Promise<void> => {
  try {
    console.log('🔄 Token 재발급 시도');

    await instance.post(API_URLS.AUTH.REFRESH);

    console.log('✅ Token 재발급 성공');
  } catch (error) {
    console.error('🔥 Token 재발급 실패', error);

    throw error;
  }
};

/**
 * Axios 인터셉터 설정
 * @param api Axios 인스턴스
 */
export const setupInterceptors = (instance: AxiosInstance): void => {
  // Request 인터셉터
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // 동시 401 발생 시 단일 리프레시 호출을 공유하기 위한 Promise
  let refreshTokenPromise: Promise<void> | null = null;

  // Response 인터셉터(액세스토큰 재발급 처리)
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | (InternalAxiosRequestConfig & { _retry?: boolean })
        | undefined;
      const status = error.response?.status;

      // 원본 요청 정보가 없거나 401이 아닌 경우 그대로 에러 반환
      if (!originalRequest || status !== 401) {
        return Promise.reject(error);
      }

      // 리프레시 엔드포인트 자체가 401 이면 로그인 페이지로 이동
      const isRefreshCall =
        typeof originalRequest.url === 'string' &&
        originalRequest.url.includes(API_URLS.AUTH.REFRESH);

      if (isRefreshCall) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        return Promise.reject(error);
      }

      // 이미 한 번 재시도한 요청은 더 이상 진행하지 않음 (무한 루프 방지)
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // 진행 중인 리프레시가 없으면 시작, 있으면 대기
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken(instance).finally(() => {
          // 완료 후 다음 401을 위해 초기화
          refreshTokenPromise = null;
        });
      }

      await refreshTokenPromise;

      return instance.request(originalRequest);
    },
  );
};
