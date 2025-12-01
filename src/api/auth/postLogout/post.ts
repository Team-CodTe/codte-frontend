import { API_URLS } from '@/api/apiUrls';
import { instance } from '@/lib/axios';

export const postLogout = async () => {
  await instance.post(API_URLS.AUTH.LOGOUT);
};
