import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

export const postRefreshDailyAssignments = async (studyId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.DAILY_ASSIGNMENT.REFRESH,
    pathParams: { studyId },
  });

  return await customFetch.post<void>(url);
};
