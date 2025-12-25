import { type GetNoteDetailResponse } from '../getNoteDetail/type';

export type GetNotesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: GetNoteDetailResponse[];
};
