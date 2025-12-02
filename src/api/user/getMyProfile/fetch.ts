import { API_URLS } from '@/api/apiUrls';
import { instance } from '@/lib/axios';

import { type GetMyProfileResponse } from './type';

export const getMyProfile = async () => {
  const { data } = await instance.get<GetMyProfileResponse>(API_URLS.USER.ME);

  return data;
};
