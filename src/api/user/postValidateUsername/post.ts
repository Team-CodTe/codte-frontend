import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import { type PostValidateUsernameRequest } from './type';

export const postValidateUsername = async (
  req: PostValidateUsernameRequest,
): Promise<void> => {
  await customFetch.post(API_URLS.USER.VALIDATE.USERNAME, req);
};
