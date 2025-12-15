import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { patchUpdateStudy } from './patch';
import {
  type patchUpdateStudyRequest,
  type patchUpdateStudyResponse,
} from './type';

export const useUpdateStudyMutation = (
  id: number,
  options?: OmittedMutationOptions<
    patchUpdateStudyResponse,
    Error,
    patchUpdateStudyRequest
  >,
) => {
  return useMutation({
    mutationKey: ['study', 'update', id],
    mutationFn: (req) => patchUpdateStudy(id, req),
    ...options,
  });
};
