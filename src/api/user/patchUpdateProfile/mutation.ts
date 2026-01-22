import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { patchUpdateProfile } from './patch';
import {
  type PatchUpdateProfileRequest,
  type PatchUpdateProfileResponse,
} from './type';

export const useUpdateProfileMutation = (
  options?: OmittedMutationOptions<
    PatchUpdateProfileResponse,
    Error,
    PatchUpdateProfileRequest
  >,
) => {
  return useMutation({
    mutationKey: ['user', 'profile', 'update', 'register'],
    mutationFn: patchUpdateProfile,
    ...options,
  });
};
