import { type UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { postValidateBoj } from './post';
import { type PostValidateBojRequest } from './type';

export const useValidateBojMutation = (
  options?: UseMutationOptions<void, Error, PostValidateBojRequest>,
) => {
  return useMutation({
    mutationKey: ['validate', 'boj'],
    mutationFn: (req: PostValidateBojRequest) => postValidateBoj(req),
    ...options,
  });
};
