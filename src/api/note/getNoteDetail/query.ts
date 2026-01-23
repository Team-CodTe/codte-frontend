import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getNoteDetail } from './fetch';
import { type GetNoteDetailResponse } from './type';

export const useNoteDetailQuery = (
  noteId: number,
  options?: OmittedQueryOptions<GetNoteDetailResponse>,
) => {
  return useQuery({
    queryKey: ['note', 'detail', noteId],
    queryFn: () => getNoteDetail(noteId),
    ...options,
  });
};

export const useNoteDetailSuspenseQuery = (
  noteId: number,
  options?: OmittedSuspenseQueryOptions<GetNoteDetailResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ['note', 'detail', noteId],
    queryFn: () => getNoteDetail(noteId),
    ...options,
  });
};
