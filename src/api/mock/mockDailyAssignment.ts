import type { DailyAssignmentResponse } from '../types/problemDto';
import { MOCK_PROBLEMS } from './mockProblem';
import { MOCK_STUDY } from './mockStudy';

export const MOCK_DAILY_ASSIGNMENT: DailyAssignmentResponse[] = [
  {
    id: 1,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: MOCK_PROBLEMS[0],
  },
  {
    id: 2,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: MOCK_PROBLEMS[1],
  },
  {
    id: 3,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: MOCK_PROBLEMS[2],
  },
  {
    id: 4,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: MOCK_PROBLEMS[3],
  },
  {
    id: 5,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: true,
    problem: MOCK_PROBLEMS[4],
  },
];
