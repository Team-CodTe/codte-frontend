import { type StudyRole } from '@/types/studyRole';

export type GetStudyDetailResponse = {
  id: number;
  name: string;
  description: string;
  inviteCode: string;
  dailyProblemCount: number;
  tierMin: number;
  tierMax: number;
  minSolved: number | null;
  maxSolved: number | null;
  templateContent: string;
  createdAt: string;
  myRole: StudyRole;
};
