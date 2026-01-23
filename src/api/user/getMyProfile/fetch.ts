import { cache } from 'react';

import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import { type GetMyProfileResponse } from './type';

export const getMyProfile = cache(async () => {
  return await customFetch.get<GetMyProfileResponse>(API_URLS.USER.ME);
});
