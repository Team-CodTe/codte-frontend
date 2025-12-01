import { StudyRole } from '@/types/studyRole';

import type { StudyMemberResponse } from '../types/studyDto';

export const MOCK_STUDY_MEMBERS: StudyMemberResponse[] = [
  {
    id: 1,
    studyId: 1,
    userId: 1,
    role: StudyRole.OWNER,
    joinedAt: '2025-01-01',
  },
  {
    id: 2,
    studyId: 1,
    userId: 2,
    role: StudyRole.MEMBER,
    joinedAt: '2025-01-02',
  },
  {
    id: 3,
    studyId: 1,
    userId: 3,
    role: StudyRole.MEMBER,
    joinedAt: '2025-01-03',
  },
  {
    id: 4,
    studyId: 1,
    userId: 4,
    role: StudyRole.MEMBER,
    joinedAt: '2025-01-04',
  },
];
