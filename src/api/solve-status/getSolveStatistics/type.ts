import {
  type NoteStatusSummary,
  type ProblemStatusSummary,
  VIEW_METHOD,
} from '../getSolveStatus/type';

export type DateRange = {
  startDate: string | null;
  endDate: string | null;
};

export type DailyStatistic = {
  date: string;
  assignedCount: number;
  problemStatusSummary: ProblemStatusSummary;
  noteStatusSummary: NoteStatusSummary;
};

export type MemberStatistic = {
  memberId: number;
  memberEmail: string;
  username: string;
  bojUsername: string;
  totalAssigned: number;
  problemStatusSummary: ProblemStatusSummary;
  noteStatusSummary: NoteStatusSummary;
  problemCompletionRate: number;
  noteCompletionRate: number;
};

export type SolveStatisticsMemberResponse = {
  view: typeof VIEW_METHOD.MEMBER | typeof VIEW_METHOD.ME;
  memberId: number;
  memberEmail: string;
  username: string;
  bojUsername: string;
  totalAssigned: number;
  problemStatusSummary: ProblemStatusSummary;
  noteStatusSummary: NoteStatusSummary;
  problemCompletionRate: number;
  noteCompletionRate: number;
  dateRange: DateRange;
  dailyStatistics: DailyStatistic[];
};

export type SolveStatisticsGroupResponse = {
  view: typeof VIEW_METHOD.GROUP;
  totalMembers: number;
  totalAssigned: number;
  problemStatusSummary: ProblemStatusSummary;
  noteStatusSummary: NoteStatusSummary;
  averageProblemCompletionRate: number;
  averageNoteCompletionRate: number;
  dateRange: DateRange;
  membersStatistics: MemberStatistic[];
};

export type GetSolveStatisticsResponse =
  | SolveStatisticsMemberResponse
  | SolveStatisticsGroupResponse;

export const isSolveStatisticsMemberResponse = (
  data: GetSolveStatisticsResponse,
): data is SolveStatisticsMemberResponse =>
  data.view === VIEW_METHOD.MEMBER || data.view === VIEW_METHOD.ME;
