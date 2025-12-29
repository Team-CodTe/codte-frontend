import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetNotesResponse } from './type';

type Params = {
  studyId: number;
  problemId?: number;
  page?: number;
  pageSize?: number;
  assignedDate?: string;
  bojNumber?: number;
  problemTitle?: string;
  updatedDate?: string;
  writer?: string;
};

export const getNotes = async ({
  studyId,
  problemId,
  page,
  pageSize,
  assignedDate,
  bojNumber,
  problemTitle,
  updatedDate,
  writer,
}: Params) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.LIST,
    pathParams: { studyId },
    queryParams: {
      problemId,
      page,
      pageSize,
      assignedDate,
      bojNumber,
      problemTitle,
      updatedDate,
      writer,
    },
  });

  return await customFetch.get<GetNotesResponse>(url);
};
