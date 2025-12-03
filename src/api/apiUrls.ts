export const API_URLS = {
  AUTH: {
    LOGIN: '/api/auth/login/',
    LOGOUT: '/api/auth/logout/',
    REFRESH: '/api/auth/refresh/',
  },
  USER: {
    ME: '/api/user/me/',
    REGISTER: '/api/user/profile/',
    VALIDATE: {
      USERNAME: '/api/user/validate/username/',
      BOJ: '/api/user/validate/boj/',
    },
  },
} as const;
