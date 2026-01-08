import {
  type OmittedInfiniteQueryOptions,
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import {
  type InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { getNotes } from './fetch';
import { type GetNotesResponse } from './type';

type Params = {
  studyId: number;
  problemId?: number;
  pageSize?: number;
  assignedDate?: string;
  updatedDate?: string;
  query?: string;
};

export const useNotesQuery = (
  { studyId, problemId, pageSize, assignedDate, updatedDate, query }: Params,
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
        updatedDate,
        query,
      }),
    ...options,
  });
};

export const useNotesSuspenseQuery = (
  { studyId, problemId, pageSize, assignedDate, updatedDate, query }: Params,
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
        updatedDate,
        query,
      }),
    ...options,
  });
};

export const useNotesInfiniteQuery = (
  { studyId, problemId, pageSize, assignedDate, updatedDate, query }: Params,
  options?: OmittedInfiniteQueryOptions<
    GetNotesResponse,
    Error,
    InfiniteData<GetNotesResponse>,
    number
  >,
) => {
  return useInfiniteQuery({
    queryKey: [
      'study',
      'notes',
      'maximize',
      studyId,
      {
        assignedDate,
        updatedDate,
        query,
      },
    ],
    queryFn: ({ pageParam }) =>
      getNotes({
        studyId,
        problemId,
        pageParam,
        pageSize,
        assignedDate,
        updatedDate,
        query,
      }),
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.next ? lastPageParam + 1 : undefined;
    },
    ...options,
  });
};
