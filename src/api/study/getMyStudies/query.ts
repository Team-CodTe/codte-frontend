import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { type ListResponseWrapper } from '@/types/responseWrapper';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getMyStudies } from './fetch';
import { type GetMyStudiesResponse } from './type';

type ApiData = ListResponseWrapper<GetMyStudiesResponse>;

type ReturnData = GetMyStudiesResponse[];

export const useMyStudiesQuery = (
  options?: OmittedQueryOptions<ApiData, Error, ReturnData>,
) => {
  return useQuery({
    queryKey: ['study', 'my-studies'],
    queryFn: getMyStudies,
    select: (res) => res.data,
    ...options,
  });
};

export const useMyStudiesSuspenseQuery = (
  options?: OmittedSuspenseQueryOptions<ApiData, Error, ReturnData>,
) => {
  return useSuspenseQuery({
    queryKey: ['study', 'my-studies'],
    queryFn: getMyStudies,
    select: (res) => res.data,
    ...options,
  });
};
