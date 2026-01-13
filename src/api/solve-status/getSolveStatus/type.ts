export const VIEW_METHOD = {
  ME: 'me',
  GROUP: 'group',
} as const;

export type ViewMethod = (typeof VIEW_METHOD)[keyof typeof VIEW_METHOD];

export const PROBLEM_STATUS = {
  NOT_ATTEMPTED: 'not_attempted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;

export type ProblemStatus =
  (typeof PROBLEM_STATUS)[keyof typeof PROBLEM_STATUS];

export const NOTE_STATUS = {
  NOT_COMPLETED: 'not_completed',
  COMPLETED: 'completed',
} as const;

export type NoteStatus = (typeof NOTE_STATUS)[keyof typeof NOTE_STATUS];

export type AssignmentStatusItem = {
  problemId: number;
  bojNumber: number;
  title: string;
  problemStatus: ProblemStatus;
  noteStatus: NoteStatus;
  lastUpdatedAt: string | null;
};

export type ProblemStatusSummary = {
  notAttemptedCount: number;
  inProgressCount: number;
  completedCount: number;
};

export type NoteStatusSummary = {
  notCompletedCount: number;
  completedCount: number;
};

export type GroupMemberItem = {
  memberId: number;
  memberEmail: string;
  username: string;
  bojUsername: string;
  assignments: AssignmentStatusItem[];
  problemStatusSummary: ProblemStatusSummary;
  noteStatusSummary: NoteStatusSummary;
  totalCount: number;
};

export type OverallSummary = {
  problemStatusSummary: ProblemStatusSummary & { total: number };
  noteStatusSummary: NoteStatusSummary & { total: number };
};

export type SolveStatusMeResponse = {
  view: typeof VIEW_METHOD.ME;
  date: string;
  assignments: AssignmentStatusItem[];
  totalCount: number;
  problemStatusSummary: ProblemStatusSummary;
  noteStatusSummary: NoteStatusSummary;
  canUpdate: boolean;
  nextAvailableAt: string | null;
  lastUpdatedAt: string | null;
};

export type SolveStatusGroupResponse = {
  view: typeof VIEW_METHOD.GROUP;
  date: string;
  members: GroupMemberItem[];
  totalMembers: number;
  overallSummary: OverallSummary;
  canUpdate: boolean;
  nextAvailableAt: string | null;
  lastUpdatedAt: string | null;
};

export type GetSolveStatusResponse =
  | SolveStatusMeResponse
  | SolveStatusGroupResponse;
