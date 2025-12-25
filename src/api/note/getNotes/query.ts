import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getNotes } from './fetch';
import { type GetNotesResponse } from './type';

type Params = {
  studyId: number;
  problemId?: number;
  page?: number;
  pageSize?: number;
};

export const useNotesQuery = (
  { studyId, problemId, page, pageSize }: Params,
  options?: OmittedQueryOptions<GetNotesResponse>,
) => {
  return useQuery({
    queryKey: ['study', 'notes', studyId, problemId, page],
    queryFn: () => getNotes({ studyId, problemId, page, pageSize }),
    ...options,
  });
};

export const useNotesSuspenseQuery = (
  { studyId, problemId, page, pageSize }: Params,
  options?: OmittedSuspenseQueryOptions<GetNotesResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ['study', 'notes', studyId, problemId, page],
    queryFn: () => getNotes({ studyId, problemId, page, pageSize }),
    ...options,
  });
};
