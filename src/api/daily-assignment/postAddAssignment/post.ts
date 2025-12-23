import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type PostAddAssignmentRequest } from './type';

export const postAddAssignment = async (
  studyId: number,
  req: PostAddAssignmentRequest,
) => {
  const url = buildUrlWithParams({
    url: API_URLS.DAILY_ASSIGNMENT.ADD,
    pathParams: { studyId },
  });

  return await customFetch.post<void>(url, req);
};
