import type { StudyMemberResponse } from '../types/studyDto';
import { StudyRole } from '../types/studyDto';
import { MOCK_STUDY } from './mockStudy';
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3, MOCK_USER_4 } from './mockUser';

export const MOCK_STUDY_MEMBERS: StudyMemberResponse[] = [
  {
    id: 1,
    study: MOCK_STUDY,
    user: MOCK_USER_1,
    role: StudyRole.OWNER,
    joinedAt: '2025-01-01',
  },
  {
    id: 2,
    study: MOCK_STUDY,
    user: MOCK_USER_2,
    role: StudyRole.MEMBER,
    joinedAt: '2025-01-02',
  },
  {
    id: 3,
    study: MOCK_STUDY,
    user: MOCK_USER_3,
    role: StudyRole.MEMBER,
    joinedAt: '2025-01-03',
  },
  {
    id: 4,
    study: MOCK_STUDY,
    user: MOCK_USER_4,
    role: StudyRole.MEMBER,
    joinedAt: '2025-01-04',
  },
];
