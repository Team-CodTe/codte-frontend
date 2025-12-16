import { type StudyRole } from '@/types/studyRole';

export type GetMyStudiesResponse = {
  studyId: number;
  studyName: string;
  memberCount: number;
  role: StudyRole;
  joinedAt: string;
};
