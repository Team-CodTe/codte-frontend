import type { DailyAssignmentResponse } from '../types/problemDto';

export const MOCK_DAILY_ASSIGNMENT: DailyAssignmentResponse[] = [
  // --- 11월 25일 (가장 오래된 날짜, ID 1번부터 시작) ---
  {
    id: 1,
    studyId: 1,
    assignedDate: '2025-11-25',
    isCustom: true,
    problemId: 101, // ID 101: 보석 도둑 (배열 마지막)
  },
  {
    id: 2,
    studyId: 1,
    assignedDate: '2025-11-25',
    isCustom: true,
    problemId: 102, // ID 102: 아기 상어
  },

  // --- 11월 26일 ---
  {
    id: 3,
    studyId: 1,
    assignedDate: '2025-11-26',
    isCustom: false,
    problemId: 103, // ID 103: 연구소
  },
  {
    id: 4,
    studyId: 1,
    assignedDate: '2025-11-26',
    isCustom: false,
    problemId: 104, // ID 104: N-Queen
  },
  {
    id: 5,
    studyId: 1,
    assignedDate: '2025-11-26',
    isCustom: false,
    problemId: 105, // ID 105: AC
  },
  {
    id: 6,
    studyId: 1,
    assignedDate: '2025-11-26',
    isCustom: false,
    problemId: 106, // ID 106: 토마토
  },

  // --- 11월 27일 ---
  {
    id: 7,
    studyId: 1,
    assignedDate: '2025-11-27',
    isCustom: false,
    problemId: 107, // ID 107: 미로 탐색
  },
  {
    id: 8,
    studyId: 1,
    assignedDate: '2025-11-27',
    isCustom: false,
    problemId: 108, // ID 108: 회의실 배정
  },
  {
    id: 9,
    studyId: 1,
    assignedDate: '2025-11-27',
    isCustom: false,
    problemId: 109, // ID 109: DFS와 BFS
  },
  {
    id: 10,
    studyId: 1,
    assignedDate: '2025-11-27',
    isCustom: false,
    problemId: 110, // ID 110: 1로 만들기
  },

  // --- 11월 28일 (가장 최근 날짜, ID 15번으로 끝) ---
  {
    id: 11,
    studyId: 1,
    assignedDate: '2025-11-28',
    isCustom: true,
    problemId: 111, // ID 111: 테토와 바게트
  },
  {
    id: 12,
    studyId: 1,
    assignedDate: '2025-11-28',
    isCustom: false,
    problemId: 112, // ID 112: 2xn 타일링 2
  },
  {
    id: 13,
    studyId: 1,
    assignedDate: '2025-11-28',
    isCustom: false,
    problemId: 113, // ID 113: 쉬운 계단 수
  },
  {
    id: 14,
    studyId: 1,
    assignedDate: '2025-11-28',
    isCustom: false,
    problemId: 114, // ID 114: 가스관
  },
  {
    id: 15,
    studyId: 1,
    assignedDate: '2025-11-28',
    isCustom: false,
    problemId: 115, // ID 115: 폴리큐브의 겉넓이 (배열 처음)
  },
];
