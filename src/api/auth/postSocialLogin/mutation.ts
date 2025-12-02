import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { postSocialLogin } from './post';
import {
  type PostSocialLoginRequest,
  type PostSocialLoginResponse,
} from './type';

export const useSocialLoginMutation = (
  options?: UseMutationOptions<
    PostSocialLoginResponse,
    Error,
    PostSocialLoginRequest
  >,
) => {
  return useMutation({
    mutationKey: ['login', 'social_login'],
    mutationFn: (req: PostSocialLoginRequest) => postSocialLogin(req),
    ...options,
  });
};
