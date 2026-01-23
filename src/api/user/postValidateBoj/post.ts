import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import { type PostValidateBojRequest } from './type';

export const postValidateBoj = async (
  req: PostValidateBojRequest,
): Promise<void> => {
  await customFetch.post(API_URLS.USER.VALIDATE.BOJ, req);
};
