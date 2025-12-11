import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postValidateUsername } from './post';
import { type PostValidateUsernameRequest } from './type';

export const useValidateUsernameMutation = (
  options?: OmittedMutationOptions<void, Error, PostValidateUsernameRequest>,
) => {
  return useMutation({
    mutationKey: ['validate', 'username'],
    mutationFn: postValidateUsername,
    ...options,
  });
};
