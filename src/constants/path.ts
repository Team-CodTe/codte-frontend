export const PATH = {
  LANDING: '/',
  LOGIN: '/login',
  PRIVACY_POLICY: '/privacy',
  TERMS_OF_SERVICE: '/terms',
  AUTH_CALLBACK: '/auth/callback',
  SIGN_UP: '/sign-up',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
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
  GOODBYE: '/goodbye',
} as const;
