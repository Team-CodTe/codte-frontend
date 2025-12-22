import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetDailyAssignmentsResponse } from './type';

export const getDailyAssignments = async (studyId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.DAILY_ASSIGNMENT.LIST,
    pathParams: { studyId },
  });

  return await customFetch.get<GetDailyAssignmentsResponse>(url);
};
