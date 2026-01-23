import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

export const postLogout = async (): Promise<void> => {
  await customFetch.post(API_URLS.AUTH.LOGOUT);
};
