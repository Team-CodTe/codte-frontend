import { STUDY_ROLE } from '@/types/studyRole';

import type { StudyMemberResponse } from '../types/studyDto';

export const MOCK_STUDY_MEMBERS: StudyMemberResponse[] = [
  {
    id: 1,
    studyId: 1,
    userId: 1,
    role: STUDY_ROLE.OWNER,
    joinedAt: '2025-01-01',
  },
  {
    id: 2,
    studyId: 1,
    userId: 2,
    role: STUDY_ROLE.MEMBER,
    joinedAt: '2025-01-02',
  },
  {
    id: 3,
    studyId: 1,
    userId: 3,
    role: STUDY_ROLE.MEMBER,
    joinedAt: '2025-01-03',
  },
  {
    id: 4,
    studyId: 1,
    userId: 4,
    role: STUDY_ROLE.MEMBER,
    joinedAt: '2025-01-04',
  },
  {
    id: 5,
    studyId: 2,
    userId: 2,
    role: STUDY_ROLE.OWNER,
    joinedAt: '2025-01-05',
  },
  {
    id: 6,
    studyId: 2,
    userId: 1,
    role: STUDY_ROLE.MEMBER,
    joinedAt: '2025-01-06',
  },
];
