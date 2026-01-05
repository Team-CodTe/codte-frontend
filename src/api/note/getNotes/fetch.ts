import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetNotesResponse } from './type';

type Params = {
  studyId: number;
  problemId?: number;
  pageParam?: number;
  pageSize?: number;
  assignedDate?: string;
  updatedDate?: string;
  query?: string;
};

export const getNotes = async ({
  studyId,
  problemId,
  pageParam: page,
  pageSize,
  assignedDate,
  updatedDate,
  query,
}: Params) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.LIST,
    pathParams: { studyId },
    queryParams: {
      problemId,
      page,
      pageSize,
      assignedDate,
      updatedDate,
      query,
    },
  });

  return await customFetch.get<GetNotesResponse>(url);
};
