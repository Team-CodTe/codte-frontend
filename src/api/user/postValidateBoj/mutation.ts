import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postValidateBoj } from './post';
import { type PostValidateBojRequest } from './type';

export const useValidateBojMutation = (
  options?: OmittedMutationOptions<void, Error, PostValidateBojRequest>,
) => {
  return useMutation({
    mutationKey: ['user', 'validate', 'boj'],
    mutationFn: postValidateBoj,
    ...options,
  });
};
