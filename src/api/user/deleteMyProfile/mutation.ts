import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { deleteMyProfile } from './delete';

export const useDeleteMyProfileMutation = (
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['user', 'profile', 'delete'],
    mutationFn: deleteMyProfile,
    ...options,
  });
};
