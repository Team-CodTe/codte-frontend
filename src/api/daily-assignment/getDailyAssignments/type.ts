export type Assignment = {
  id: number;
  bojNumber: number;
  title: string;
  tier: number;
  link: string;
  assignedDate: string;
  isCustom: boolean;
};

export type GetDailyAssignmentsResponse = {
  assignments: Assignment[];
  canRefresh: boolean;
  refreshCooldownSeconds: number;
};
