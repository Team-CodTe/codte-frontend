import { API_URLS } from '@/api/apiUrls';
import { instance } from '@/lib/axios';

import { type PostValidateUsernameRequest } from './type';

export const postValidateUsername = async (
  req: PostValidateUsernameRequest,
) => {
  const { data } = await instance.post(API_URLS.USER.VALIDATE.USERNAME, req);

  return data;
};
