import { type StudyRole } from '@/types/studyRole';

export interface StudyResponse {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  inviteCode: string;
  dailyProblemCount: number;
  targetTier: string;
  templateContent: string;
  createdAt: string;
}

export interface StudyMemberResponse {
  id: number;
  studyId: number;
  userId: number;
  role: StudyRole;
  joinedAt: string;
}
