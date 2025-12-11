import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

import { getStudyDetail } from './fetch';
import { type GetStudyDetailResponse } from './type';

export const useStudyDetailQuery = (
  id: string,
  options?: OmittedQueryOptions<GetStudyDetailResponse>,
) => {
  return useQuery({
    queryKey: ['studyDetail', id],
    queryFn: () => getStudyDetail(id),
    ...options,
  });
};

export const useStudyDetailSuspenseQuery = (
  id: string,
  options?: OmittedSuspenseQueryOptions<GetStudyDetailResponse>,
) => {
  return useQuery({
    queryKey: ['studyDetail', id],
    queryFn: () => getStudyDetail(id),
    ...options,
  });
};
