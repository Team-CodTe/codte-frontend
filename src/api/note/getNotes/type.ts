export type Notes = {
  id: number;
  username: string;
  problemId: number;
  problemTitle: string;
  problemBojNumber: number;
  problemBojTier: number;
  problemLink: string;
  assignedDate: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type GetNotesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notes[];
};
