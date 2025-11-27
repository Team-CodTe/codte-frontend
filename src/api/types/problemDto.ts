import type { StudyResponse } from './studyDto';

export interface ProblemResponse {
  id: number;
  bojNumber: number;
  title: string;
  tier: number; // 난이도 (Solved.ac level)
  link: string;
}

export interface DailyAssignmentResponse {
  id: number;
  study: StudyResponse;
  problem: ProblemResponse;
  assignedDate: string; // YYYY-MM-DD
  isCustom: boolean;
}
