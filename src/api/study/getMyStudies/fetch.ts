import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import { type GetMyStudiesResponseWrapper } from './type';

export const getMyStudies = async () => {
  return await customFetch.get<GetMyStudiesResponseWrapper>(
    API_URLS.STUDY.MY_LIST,
  );
};
