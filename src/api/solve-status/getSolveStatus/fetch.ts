import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetSolveStatusResponse, type ViewMethod } from './type';

type Params = {
  studyId: number;
  date?: string;
  view?: ViewMethod;
};

export const getSolveStatus = async ({ studyId, date, view }: Params) => {
  const url = buildUrlWithParams({
    url: API_URLS.SOLVE_STATUS.OVERVIEW,
    pathParams: { studyId },
    queryParams: { date, view },
  });

  return await customFetch.get<GetSolveStatusResponse>(url);
};
