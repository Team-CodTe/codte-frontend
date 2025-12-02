import { API_URLS } from '@/api/apiUrls';
import { instance } from '@/lib/axios';

import { type PostValidateBojRequest } from './type';

export const postValidateBoj = async (req: PostValidateBojRequest) => {
  const { data } = await instance.post(API_URLS.USER.VALIDATE.BOJ, req);

  return data;
};
