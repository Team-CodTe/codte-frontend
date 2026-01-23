export type DailyAssignment = {
  id: number;
  problemId: number;
  bojNumber: number;
  title: string;
  tier: number;
  link: string;
  assignedDate: string;
  isCustom: boolean;
};

export type GetDailyAssignmentsResponse = {
  assignments: DailyAssignment[];
  refreshedAt: string;
  nextRefreshAvailableAt: string;
  canRefresh: boolean;
};
