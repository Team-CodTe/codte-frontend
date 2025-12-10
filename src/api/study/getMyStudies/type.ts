import { type StudyRole } from '@/types/studyRole';

export type GetMyStudiesResponse = {
  studyName: string;
  memberCount: number;
  role: StudyRole;
  joinedAt: string;
};

export type GetMyStudiesResponseWrapper = {
  data: GetMyStudiesResponse[];
};
