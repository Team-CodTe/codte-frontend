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
    page,
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
        page,
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
    page,
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
        page,
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
