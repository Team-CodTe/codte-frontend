import type { StudyMemberResponse } from '../types/studyDto';
import { StudyRole } from '../types/studyDto';
import { mockStudy } from './mockStudy';
import { mockUser1, mockUser2, mockUser3, mockUser4 } from './mockUser';

export const mockStudyMembers: StudyMemberResponse[] = [
  {
    id: 1,
    study: mockStudy,
    user: mockUser1,
    role: StudyRole.OWNER,
    joinedAt: '2025-01-01',
  },
  {
    id: 2,
    study: mockStudy,
    user: mockUser2,
    role: StudyRole.MEMBER,
    joinedAt: '2025-01-02',
  },
  {
    id: 3,
    study: mockStudy,
    user: mockUser3,
    role: StudyRole.MEMBER,
    joinedAt: '2025-01-03',
  },
  {
    id: 4,
    study: mockStudy,
    user: mockUser4,
    role: StudyRole.MEMBER,
    joinedAt: '2025-01-04',
  },
];
