import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetNotesResponse } from './type';

type Params = {
  studyId: number;
  problemId?: number;
  page?: number;
  pageSize?: number;
};

export const getNotes = async ({
  studyId,
  problemId,
  page,
  pageSize,
}: Params) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.LIST,
    pathParams: { studyId },
    queryParams: { problemId, page, pageSize },
  });

  return await customFetch.get<GetNotesResponse>(url);
};
