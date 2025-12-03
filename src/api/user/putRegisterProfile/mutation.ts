import { type UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { putRegisterProfile } from './put';
import {
  type PutRegisterProfileRequest,
  type PutRegisterProfileResponse,
} from './type';

export const useRegisterProfileMutation = (
  options?: UseMutationOptions<
    PutRegisterProfileResponse,
    Error,
    PutRegisterProfileRequest
  >,
) => {
  return useMutation({
    mutationKey: ['register', 'profile'],
    mutationFn: (req: PutRegisterProfileRequest) => putRegisterProfile(req),
    ...options,
  });
};
