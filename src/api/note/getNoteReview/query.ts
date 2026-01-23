import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getNoteReview } from './fetch';
import { type GetNoteReviewResponse } from './type';

export const useNoteReviewQuery = (
  noteId: number,
  options?: OmittedQueryOptions<GetNoteReviewResponse>,
) => {
  return useQuery({
    queryKey: ['note', 'detail', 'review', noteId],
    queryFn: () => getNoteReview(noteId),
    ...options,
  });
};

export const useNoteReviewSuspenseQuery = (
  noteId: number,
  options?: OmittedSuspenseQueryOptions<GetNoteReviewResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ['note', 'detail', 'review', noteId],
    queryFn: () => getNoteReview(noteId),
    ...options,
  });
};
