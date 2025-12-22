export type DailyAssignment = {
  id: number;
  bojNumber: number;
  title: string;
  tier: number;
  link: string;
  assignedDate: string;
  isCustom: boolean;
};

export type GetDailyAssignmentsResponse = {
  assignments: DailyAssignment[];
  canRefresh: boolean;
  refreshCooldownSeconds: number;
};
