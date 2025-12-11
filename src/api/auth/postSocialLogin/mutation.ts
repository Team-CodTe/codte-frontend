import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postSocialLogin } from './post';
import {
  type PostSocialLoginRequest,
  type PostSocialLoginResponse,
} from './type';

export const useSocialLoginMutation = (
  options?: OmittedMutationOptions<
    PostSocialLoginResponse,
    Error,
    PostSocialLoginRequest
  >,
) => {
  return useMutation({
    mutationKey: ['login', 'social_login'],
    mutationFn: postSocialLogin,
    ...options,
  });
};
