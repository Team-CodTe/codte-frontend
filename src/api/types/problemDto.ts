export interface ProblemResponse {
  id: number;
  bojNumber: number;
  title: string;
  tier: number;
  link: string;
}

export interface DailyAssignmentResponse {
  id: number;
  studyId: number;
  problemId: number;
  assignedDate: string;
  isCustom: boolean;
}
