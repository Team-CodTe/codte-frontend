import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import {
  keepPreviousData,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { getNotes } from './fetch';
import { type GetNotesResponse } from './type';

type Params = {
  studyId: number;
  problemId?: number;
  page?: number;
  pageSize?: number;
  assignedDate?: string;
  createdDate?: string;
  query?: string;
};

export const useNotesQuery = (
  { studyId, problemId, pageSize, assignedDate, createdDate, query }: Params,
  options?: OmittedQueryOptions<GetNotesResponse>,
) => {
  return useQuery({
    queryKey: ['study', 'notes', studyId],
    queryFn: () =>
      getNotes({
        studyId,
        problemId,
        pageSize,
        assignedDate,
        createdDate,
        query,
      }),
    ...options,
  });
};

export const useNotesSuspenseQuery = (
  { studyId, problemId, pageSize, assignedDate, createdDate, query }: Params,
  options?: OmittedSuspenseQueryOptions<GetNotesResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ['study', 'notes', studyId],
    queryFn: () =>
      getNotes({
        studyId,
        problemId,
        pageSize,
        assignedDate,
        createdDate,
        query,
      }),
    ...options,
  });
};

export const useNotesPaginatedQuery = (
  {
    studyId,
    problemId,
    page,
    pageSize,
    assignedDate,
    createdDate,
    query,
  }: Params,
  options?: OmittedQueryOptions<GetNotesResponse>,
) => {
  return useQuery({
    queryKey: [
      'study',
      'notes',
      'maximize',
      studyId,
      {
        page,
        pageSize,
        assignedDate,
        createdDate,
        query,
      },
    ],
    queryFn: () =>
      getNotes({
        studyId,
        problemId,
        page,
        pageSize,
        assignedDate,
        createdDate,
        query,
      }),
    placeholderData: keepPreviousData,
    ...options,
  });
};
