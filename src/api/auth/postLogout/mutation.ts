import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postLogout } from './post';

export const useLogoutMutation = (options?: OmittedMutationOptions<void>) => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: postLogout,
    ...options,
  });
};
