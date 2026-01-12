export const PATH = {
  LANDING: '/',
  LOGIN: '/login',
  AUTH_CALLBACK: '/auth/callback',
  SIGN_UP: '/sign-up',
  DASHBOARD: '/dashboard',
  STUDY: {
    CREATE: '/study/create',
    JOIN: '/study/join',
    SPACE: '/study/{studyId}',
    SETTING: '/study/{studyId}/setting',
    NOTES: {
      LIST: '/study/{studyId}/notes',
      TEMPLATE: '/study/{studyId}/notes/template',
      WRITE: '/study/{studyId}/notes/write',
      DETAIL: '/study/{studyId}/notes/{noteId}',
      EDIT: '/study/{studyId}/notes/{noteId}/edit',
    },
  },
} as const;
