import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

export const deleteMyProfile = async () => {
  return await customFetch.delete<void>(API_URLS.USER.ME);
};
