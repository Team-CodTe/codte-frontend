import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getMembers } from './fetch';
import { type GetMembersResponse } from './type';

export const useMembersQuery = (
  studyId: number,
  options?: OmittedQueryOptions<GetMembersResponse[]>,
) => {
  return useQuery({
    queryKey: ['study', 'members', studyId],
    queryFn: () => getMembers(studyId),
    ...options,
  });
};

export const useMembersSuspenseQuery = (
  studyId: number,
  options?: OmittedSuspenseQueryOptions<GetMembersResponse[]>,
) => {
  return useSuspenseQuery({
    queryKey: ['study', 'members', studyId],
    queryFn: () => getMembers(studyId),
    ...options,
  });
};
