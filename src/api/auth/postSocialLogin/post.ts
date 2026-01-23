import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import {
  type PostSocialLoginRequest,
  type PostSocialLoginResponse,
} from './type';

export const postSocialLogin = async (req: PostSocialLoginRequest) => {
  return await customFetch.post<PostSocialLoginResponse>(
    API_URLS.AUTH.LOGIN,
    req,
  );
};
