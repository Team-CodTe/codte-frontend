import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import { type GetMyStudiesResponse } from './type';

export const getMyStudies = async () => {
  return await customFetch.get<GetMyStudiesResponse[]>(API_URLS.STUDY.MY_LIST);
};
