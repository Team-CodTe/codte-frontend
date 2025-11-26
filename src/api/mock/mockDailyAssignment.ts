import type { DailyAssignmentResponse } from '../types/problemDto';
import { MOCK_STUDY } from './mockStudy';

export const MOCK_DAILY_ASSIGNMENT: DailyAssignmentResponse[] = [
  {
    id: 1,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: {
      id: 101,
      bojNumber: 2708,
      title: '폴리큐브의 겉넓이',
      tier: 13,
      link: 'https://www.acmicpc.net/problem/2708',
    },
  },
  {
    id: 2,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: {
      id: 102,
      bojNumber: 2931,
      title: '가스관',
      tier: 14,
      link: 'https://www.acmicpc.net/problem/2931',
    },
  },
  {
    id: 3,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: {
      id: 103,
      bojNumber: 10844,
      title: '쉬운 계단 수',
      tier: 10,
      link: 'https://www.acmicpc.net/problem/10844',
    },
  },
  {
    id: 4,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: {
      id: 104,
      bojNumber: 11727,
      title: '2xn 타일링 2',
      tier: 8,
      link: 'https://www.acmicpc.net/problem/11727',
    },
  },
  {
    id: 5,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: true,
    problem: {
      id: 105,
      bojNumber: 34156,
      title: '테토와 바게트',
      tier: 13,
      link: 'https://www.acmicpc.net/problem/34156',
    },
  },
];
