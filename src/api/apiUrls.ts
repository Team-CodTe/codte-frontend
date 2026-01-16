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
  ASSIGNMENT: {
    LIST: '/api/studies/{studyId}/assignments/',
    REFRESH: '/api/studies/{studyId}/assignments/',
    CUSTOM: '/api/studies/{studyId}/assignments/custom/',
  },
  SOLVE_STATUS: {
    OVERVIEW: '/api/studies/{studyId}/assignments/status/',
    REFRESH: '/api/studies/{studyId}/assignments/update/',
    PROBLEM_MEMBERS:
      '/api/studies/{studyId}/problems/{problemId}/status/members/',
    STATISTICS: '/api/studies/{studyId}/statistics/',
  },
  NOTE: {
    TEMPLATE: '/api/studies/{studyId}/template/',
    LIST: '/api/studies/{studyId}/notes/',
    CREATE: '/api/studies/{studyId}/notes/',
    DETAIL: '/api/notes/{noteId}/',
    UPDATE: '/api/notes/{noteId}/',
    REMOVE: '/api/notes/{noteId}/',
  },
} as const;
