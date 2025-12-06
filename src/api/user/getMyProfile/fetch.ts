import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import { type GetMyProfileResponse } from './type';

export const getMyProfile = async () => {
  return await customFetch.get<GetMyProfileResponse>(API_URLS.USER.ME);
};
