export const PATH = {
  LANDING: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  AUTH_CALLBACK: '/auth/callback',
  STUDY: {
    HOME: '/study',
    CREATE: '/study/create',
    JOIN: '/study/join',
    MAIN: '/study/{studyId}',
    SETTING: '/study/{studyId}/setting',
    NOTE: {
      TEMPLATE: '/study/{studyId}/note/template',
      WRITE: '/study/{studyId}/note/write',
      DETAIL: '/study/{studyId}/note/{noteId}',
      EDIT: '/study/{studyId}/note/{noteId}/edit',
    },
  },
};
