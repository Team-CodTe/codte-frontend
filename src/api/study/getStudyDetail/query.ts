import {
  type OmittedQueryOptions,
  type OmittedSuspenseQueryOptions,
} from '@/lib/queryClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getStudyDetail } from './fetch';
import { type GetStudyDetailResponse } from './type';

export const useStudyDetailQuery = (
  studyId: number,
  options?: OmittedQueryOptions<GetStudyDetailResponse>,
) => {
  return useQuery({
    queryKey: ['study', 'detail', studyId],
    queryFn: () => getStudyDetail(studyId),
    ...options,
  });
};

export const useStudyDetailSuspenseQuery = (
  studyId: number,
  options?: OmittedSuspenseQueryOptions<GetStudyDetailResponse>,
) => {
  return useSuspenseQuery({
    queryKey: ['study', 'detail', studyId],
    queryFn: () => getStudyDetail(studyId),
    ...options,
  });
};
