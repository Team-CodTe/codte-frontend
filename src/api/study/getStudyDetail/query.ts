import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

import { getStudyDetail } from './fetch';
import { type GetStudyDetailResponse } from './type';

export const useStudyDetailQuery = (
  id: number,
  options?: OmittedQueryOptions<GetStudyDetailResponse>,
) => {
  return useQuery({
    queryKey: ['study', 'detail', id],
    queryFn: () => getStudyDetail(id),
    ...options,
  });
};

export const useStudyDetailSuspenseQuery = (
  id: number,
  options?: OmittedSuspenseQueryOptions<GetStudyDetailResponse>,
) => {
  return useQuery({
    queryKey: ['study', 'detail', id],
    queryFn: () => getStudyDetail(id),
    ...options,
  });
};
