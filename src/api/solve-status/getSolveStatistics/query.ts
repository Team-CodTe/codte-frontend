import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { type ViewMethod } from '../getSolveStatus/type';
import { getSolveStatistics } from './fetch';
import { type GetSolveStatisticsResponse } from './type';

type Params = {
  studyId: number;
  view?: ViewMethod;
  memberId?: number;
  startDate?: string;
  endDate?: string;
};

export const useSolveStatisticsQuery = (
  { studyId, view, memberId, startDate, endDate }: Params,
  options?: OmittedQueryOptions<GetSolveStatisticsResponse>,
) => {
  return useQuery({
    queryKey: [
      'study',
      'solve-statistics',
      studyId,
      { view, memberId, startDate, endDate },
    ],
    queryFn: () =>
      getSolveStatistics({ studyId, view, memberId, startDate, endDate }),
    ...options,
  });
};

export const useSolveStatisticsSuspenseQuery = (
  { studyId, view, memberId, startDate, endDate }: Params,
  options?: OmittedSuspenseQueryOptions<GetSolveStatisticsResponse>,
) => {
  return useSuspenseQuery({
    queryKey: [
      'study',
      'solve-statistics',
      studyId,
      { view, memberId, startDate, endDate },
    ],
    queryFn: () =>
      getSolveStatistics({ studyId, view, memberId, startDate, endDate }),
    ...options,
  });
};
