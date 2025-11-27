import type { DailyAssignmentResponse } from '../types/problemDto';
import { MOCK_PROBLEMS } from './mockProblem';
import { MOCK_STUDY } from './mockStudy';

export const MOCK_DAILY_ASSIGNMENT: DailyAssignmentResponse[] = [
  // --- 11월 25일 (가장 오래된 날짜, ID 1번부터 시작) ---
  {
    id: 1,
    study: MOCK_STUDY,
    assignedDate: '2025-11-25',
    isCustom: true,
    problem: MOCK_PROBLEMS[0], // ID 101: 보석 도둑 (배열 마지막)
  },
  {
    id: 2,
    study: MOCK_STUDY,
    assignedDate: '2025-11-25',
    isCustom: true,
    problem: MOCK_PROBLEMS[1], // ID 102: 아기 상어
  },

  // --- 11월 26일 ---
  {
    id: 3,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: MOCK_PROBLEMS[2], // ID 103: 연구소
  },
  {
    id: 4,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: MOCK_PROBLEMS[3], // ID 104: N-Queen
  },
  {
    id: 5,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: MOCK_PROBLEMS[4], // ID 105: AC
  },
  {
    id: 6,
    study: MOCK_STUDY,
    assignedDate: '2025-11-26',
    isCustom: false,
    problem: MOCK_PROBLEMS[5], // ID 106: 토마토
  },

  // --- 11월 27일 ---
  {
    id: 7,
    study: MOCK_STUDY,
    assignedDate: '2025-11-27',
    isCustom: false,
    problem: MOCK_PROBLEMS[6], // ID 107: 미로 탐색
  },
  {
    id: 8,
    study: MOCK_STUDY,
    assignedDate: '2025-11-27',
    isCustom: false,
    problem: MOCK_PROBLEMS[7], // ID 108: 회의실 배정
  },
  {
    id: 9,
    study: MOCK_STUDY,
    assignedDate: '2025-11-27',
    isCustom: false,
    problem: MOCK_PROBLEMS[8], // ID 109: DFS와 BFS
  },
  {
    id: 10,
    study: MOCK_STUDY,
    assignedDate: '2025-11-27',
    isCustom: false,
    problem: MOCK_PROBLEMS[9], // ID 110: 1로 만들기
  },

  // --- 11월 28일 (가장 최근 날짜, ID 15번으로 끝) ---
  {
    id: 11,
    study: MOCK_STUDY,
    assignedDate: '2025-11-28',
    isCustom: true,
    problem: MOCK_PROBLEMS[10], // ID 111: 테토와 바게트
  },
  {
    id: 12,
    study: MOCK_STUDY,
    assignedDate: '2025-11-28',
    isCustom: false,
    problem: MOCK_PROBLEMS[11], // ID 112: 2xn 타일링 2
  },
  {
    id: 13,
    study: MOCK_STUDY,
    assignedDate: '2025-11-28',
    isCustom: false,
    problem: MOCK_PROBLEMS[12], // ID 113: 쉬운 계단 수
  },
  {
    id: 14,
    study: MOCK_STUDY,
    assignedDate: '2025-11-28',
    isCustom: false,
    problem: MOCK_PROBLEMS[13], // ID 114: 가스관
  },
  {
    id: 15,
    study: MOCK_STUDY,
    assignedDate: '2025-11-28',
    isCustom: false,
    problem: MOCK_PROBLEMS[14], // ID 115: 폴리큐브의 겉넓이 (배열 처음)
  },
];
