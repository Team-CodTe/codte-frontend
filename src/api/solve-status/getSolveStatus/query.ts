import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getSolveStatus } from './fetch';
import { type GetSolveStatusResponse, type ViewMethod } from './type';

type Params = {
  studyId: number;
  date?: string;
  view?: ViewMethod;
};

export const useSolveStatusQuery = (
  { studyId, date, view }: Params,
  options?: OmittedQueryOptions<GetSolveStatusResponse>,
) => {
  return useQuery({
    queryKey: ['study', 'solve-status', studyId, { date, view }],
    queryFn: () => getSolveStatus({ studyId, date, view }),
    ...options,
  });
};

export const useSolveStatusSuspenseQuery = (
  { studyId, date, view }: Params,
  options?: OmittedSuspenseQueryOptions<GetSolveStatusResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ['study', 'solve-status', studyId, { date, view }],
    queryFn: () => getSolveStatus({ studyId, date, view }),
    ...options,
  });
};
