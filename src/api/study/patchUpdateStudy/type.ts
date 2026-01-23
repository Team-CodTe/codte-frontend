export type patchUpdateStudyRequest = {
  name?: string;
  description?: string;
  dailyProblemCount?: number;
  tierMin?: number;
  tierMax?: number;
  minSolved?: number | null;
  maxSolved?: number | null;
  templateContent?: string;
};

export type patchUpdateStudyResponse = {
  id: number;
  name: string;
  description: string;
  inviteCode: string;
  dailyProblemCount: number;
  tierMin: number;
  tierMax: number;
  minSolved: number | null;
  maxSolved: number | null;
  templateContent: string;
  createdAt: string;
};
