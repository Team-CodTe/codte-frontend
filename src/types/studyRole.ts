export const STUDY_ROLE = {
  OWNER: 'owner',
  MEMBER: 'member',
} as const;

export type StudyRole = (typeof STUDY_ROLE)[keyof typeof STUDY_ROLE];
