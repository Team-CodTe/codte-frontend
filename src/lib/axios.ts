import axios from 'axios';

import { setupInterceptors } from './interceptor';

const API_TIMEOUT_MS = 5000;

export const instance = axios.create({
  baseURL: process.env.LOCAL_API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 액세스 토큰 및 리프레쉬 토큰 자동으로 첨부
});

setupInterceptors(instance);
