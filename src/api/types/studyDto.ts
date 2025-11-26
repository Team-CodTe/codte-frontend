import type { UserResponse } from './userDto';

export enum StudyRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

export interface StudyResponse {
  id: number;
  owner: UserResponse;
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
  study: StudyResponse;
  user: UserResponse;
  role: StudyRole;
  joinedAt: string;
}
