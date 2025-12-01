import axios from 'axios';

const API_TIMEOUT_MS = 5000;

/** @todo API URL 추가 */
export const instance = axios.create({
  baseURL: '',
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 액세스 토큰 및 리프레쉬 토큰 자동으로 첨부
});

/** @todo 401 에러 발생 시 리프레쉬 토큰으로 액세스 토큰 재발급 로직 추가 */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
