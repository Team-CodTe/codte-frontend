import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getDailyAssignments } from './fetch';
import { type GetDailyAssignmentsResponse } from './type';

export const useDailyAssignmentsQuery = (
  studyId: number,
  options?: OmittedQueryOptions<GetDailyAssignmentsResponse>,
) => {
  return useQuery({
    queryKey: ['daily-assignments', studyId],
    queryFn: () => getDailyAssignments(studyId),
    ...options,
  });
};

export const useDailyAssignmentSuspenseQuery = (
  studyId: number,
  options?: OmittedSuspenseQueryOptions<GetDailyAssignmentsResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ['daily-assignments', studyId],
    queryFn: () => getDailyAssignments(studyId),
    ...options,
  });
};
