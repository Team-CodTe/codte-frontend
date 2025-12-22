export const API_URLS = {
  AUTH: {
    LOGIN: '/api/auth/login/',
    LOGOUT: '/api/auth/logout/',
    REFRESH: '/api/auth/refresh/',
  },
  USER: {
    ME: '/api/user/me/',
    UPDATE: '/api/user/profile/',
    VALIDATE: {
      USERNAME: '/api/user/validate/username/',
      BOJ: '/api/user/validate/boj/',
    },
  },
  STUDY: {
    MY_LIST: '/api/studies/me/',
    CREATE: '/api/studies/',
    JOIN: '/api/studies/join/',
    DETAIL: '/api/studies/{studyId}/',
    UPDATE: '/api/studies/{studyId}/',
    REMOVE: '/api/studies/{studyId}/',
    LEAVE: '/api/studies/{studyId}/leave/',
  },
  DAILY_ASSIGNMENT: {
    LIST: '/api/studies/{studyId}/daily-assignments/',
    REFRESH: '/api/studies/{studyId}/daily-assignments/',
  },
} as const;
