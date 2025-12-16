import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getMyProfile } from './fetch';
import { type GetMyProfileResponse } from './type';

export const useMyProfileQuery = (
  options?: OmittedQueryOptions<GetMyProfileResponse>,
) => {
  return useQuery({
    queryKey: ['user', 'my-profile'],
    queryFn: getMyProfile,
    ...options,
  });
};

export const useMyProfileSuspenseQuery = (
  options?: OmittedSuspenseQueryOptions<GetMyProfileResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ['user', 'my-profile'],
    queryFn: getMyProfile,
    ...options,
  });
};
