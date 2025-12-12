export const STUDY_ROLE = {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER',
} as const;

export type StudyRole = (typeof STUDY_ROLE)[keyof typeof STUDY_ROLE];
