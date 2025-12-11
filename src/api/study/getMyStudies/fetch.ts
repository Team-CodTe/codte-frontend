import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';
import { type ListResponseWrapper } from '@/types/responseWrapper';

import { type GetMyStudiesResponse } from './type';

export const getMyStudies = async () => {
  return await customFetch.get<ListResponseWrapper<GetMyStudiesResponse>>(
    API_URLS.STUDY.MY_LIST,
  );
};
