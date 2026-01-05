import {
  type OmittedInfiniteQueryOptions,
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import {
  type InfiniteData,
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
  bojNumber?: number;
  problemTitle?: string;
  updatedDate?: string;
  writer?: string;
};

export const useNotesQuery = (
  {
    studyId,
    problemId,
    pageSize,
    assignedDate,
    bojNumber,
    problemTitle,
    updatedDate,
    writer,
  }: Params,
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
        bojNumber,
        problemTitle,
        updatedDate,
        writer,
      }),
    ...options,
  });
};

export const useNotesSuspenseQuery = (
  {
    studyId,
    problemId,
    pageSize,
    assignedDate,
    bojNumber,
    problemTitle,
    updatedDate,
    writer,
  }: Params,
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
        bojNumber,
        problemTitle,
        updatedDate,
        writer,
      }),
    ...options,
  });
};

export const useNotesInfiniteQuery = (
  {
    studyId,
    problemId,
    pageSize,
    assignedDate,
    bojNumber,
    problemTitle,
    updatedDate,
    writer,
  }: Params,
  options?: OmittedInfiniteQueryOptions<
    GetNotesResponse,
    Error,
    InfiniteData<GetNotesResponse>,
    number
  >,
) => {
  return useInfiniteQuery({
    queryKey: ['study', 'notes', 'maximize', studyId],
    queryFn: ({ pageParam }) =>
      getNotes({
        studyId,
        problemId,
        page: pageParam,
        pageSize,
        assignedDate,
        bojNumber,
        problemTitle,
        updatedDate,
        writer,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.next ? lastPageParam + 1 : undefined;
    },
    ...options,
  });
};
