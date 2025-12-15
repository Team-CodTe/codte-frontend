export const API_URLS = {
  AUTH: {
    LOGIN: 'api/auth/login/',
    LOGOUT: 'api/auth/logout/',
    REFRESH: 'api/auth/refresh/',
  },
  USER: {
    ME: 'api/user/me/',
    REGISTER: 'api/user/profile/',
    VALIDATE: {
      USERNAME: 'api/user/validate/username/',
      BOJ: 'api/user/validate/boj/',
    },
  },
  STUDY: {
    MY_LIST: 'api/studies/me/',
    CREATE: 'api/studies/',
    JOIN: 'api/studies/join/',
    DETAIL: 'api/studies/{id}/',
    UPDATE: 'api/studies/{id}/',
    REMOVE: 'api/studies/{id}/',
    LEAVE: 'api/studies/{id}/leave/',
  },
} as const;
