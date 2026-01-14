import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type ViewMethod } from '../getSolveStatus/type';
import { type GetSolveStatisticsResponse } from './type';

type Params = {
  studyId: number;
  view?: ViewMethod;
  memberId?: number;
  startDate?: string;
  endDate?: string;
};

export const getSolveStatistics = async ({
  studyId,
  view,
  memberId,
  startDate,
  endDate,
}: Params) => {
  const url = buildUrlWithParams({
    url: API_URLS.SOLVE_STATUS.STATISTICS,
    pathParams: { studyId },
    queryParams: { view, memberId, startDate, endDate },
  });

  return await customFetch.get<GetSolveStatisticsResponse>(url);
};
