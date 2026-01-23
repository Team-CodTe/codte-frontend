import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

export const postRefreshSolveStatus = async (studyId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.SOLVE_STATUS.REFRESH,
    pathParams: { studyId },
  });

  return await customFetch.post<void>(url);
};
