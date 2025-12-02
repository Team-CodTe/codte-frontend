import { type UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { postValidateUsername } from './post';
import { type PostValidateUsernameRequest } from './type';

export const useValidateUsernameMutation = (
  options?: UseMutationOptions<void, Error, PostValidateUsernameRequest>,
) => {
  return useMutation({
    mutationKey: ['validate', 'username'],
    mutationFn: (req: PostValidateUsernameRequest) => postValidateUsername(req),
    ...options,
  });
};
