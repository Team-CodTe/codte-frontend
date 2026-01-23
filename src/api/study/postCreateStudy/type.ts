export type postCreateStudyRequest = {
  name: string;
  description?: string;
  dailyProblemCount: number;
  tierMin: number;
  tierMax: number;
  minSolved?: number | null;
  maxSolved?: number | null;
};

export type postCreateStudyResponse = {
  id: number;
  name: string;
  description: string;
  inviteCode: string;
  dailyProblemCount: number;
  tierMin: number;
  tierMax: number;
  minSolved: number | null;
  maxSolved: number | null;
  createdAt: string;
};
