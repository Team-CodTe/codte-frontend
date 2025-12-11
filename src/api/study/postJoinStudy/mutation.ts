import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postJoinStudy } from './post';
import { type PostJoinStudyRequest, type PostJoinStudyResponse } from './type';

export const useJoinStudyMutation = (
  options?: OmittedMutationOptions<
    PostJoinStudyResponse,
    Error,
    PostJoinStudyRequest
  >,
) => {
  return useMutation({
    mutationKey: ['study', 'join'],
    mutationFn: postJoinStudy,
    ...options,
  });
};
