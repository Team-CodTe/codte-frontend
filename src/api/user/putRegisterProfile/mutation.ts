import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { putRegisterProfile } from './put';
import {
  type PutRegisterProfileRequest,
  type PutRegisterProfileResponse,
} from './type';

export const useRegisterProfileMutation = (
  options?: OmittedMutationOptions<
    PutRegisterProfileResponse,
    Error,
    PutRegisterProfileRequest
  >,
) => {
  return useMutation({
    mutationKey: ['register', 'profile'],
    mutationFn: putRegisterProfile,
    ...options,
  });
};
