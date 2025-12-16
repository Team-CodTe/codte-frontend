import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { patchUpdateStudy } from './patch';
import {
  type patchUpdateStudyRequest,
  type patchUpdateStudyResponse,
} from './type';

export const useUpdateStudyMutation = (
  studyId: number,
  options?: OmittedMutationOptions<
    patchUpdateStudyResponse,
    Error,
    patchUpdateStudyRequest
  >,
) => {
  return useMutation({
    mutationKey: ['study', 'update', studyId],
    mutationFn: (req) => patchUpdateStudy(studyId, req),
    ...options,
  });
};
