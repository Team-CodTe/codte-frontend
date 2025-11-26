import type { ProblemResponse } from './problemDto';
import type { StudyResponse } from './studyDto';
import type { UserResponse } from './userDto';

export interface SolutionNoteResponse {
  id: number;
  study: StudyResponse;
  user: UserResponse;
  problem: ProblemResponse;
  content: string;
  createdAt: string;
  updatedAt: string;
}
