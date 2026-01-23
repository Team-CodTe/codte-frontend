import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postCreateStudy } from './post';
import {
  type postCreateStudyRequest,
  type postCreateStudyResponse,
} from './type';

export const useCreateStudyMutation = (
  options?: OmittedMutationOptions<
    postCreateStudyResponse,
    Error,
    postCreateStudyRequest
  >,
) => {
  return useMutation({
    mutationKey: ['study', 'create'],
    mutationFn: postCreateStudy,
    ...options,
  });
};
