import { type UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { postLogout } from './post';

export const usePostLogoutMutation = (options?: UseMutationOptions<void>) => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => postLogout(),
    ...options,
  });
};
