import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getMyStudies } from './fetch';
import { type GetMyStudiesResponse } from './type';

export const useMyStudiesQuery = (
  options?: OmittedQueryOptions<GetMyStudiesResponse[]>,
) => {
  return useQuery({
    queryKey: ['study', 'my-studies'],
    queryFn: getMyStudies,
    ...options,
  });
};

export const useMyStudiesSuspenseQuery = (
  options?: OmittedSuspenseQueryOptions<GetMyStudiesResponse[]>,
) => {
  return useSuspenseQuery({
    queryKey: ['study', 'my-studies'],
    queryFn: getMyStudies,
    ...options,
  });
};
