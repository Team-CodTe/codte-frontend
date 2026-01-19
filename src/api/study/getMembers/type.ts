import { type StudyRole } from '@/types/studyRole';

export type GetMembersResponse = {
  id: number;
  username: string;
  email: string;
  bojUsername: string;
  role: StudyRole;
  joinedAt: string;
};
