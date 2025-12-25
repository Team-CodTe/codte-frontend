import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type PostCustomAssignmentRequest } from './type';

export const postCustomAssignment = async (
  studyId: number,
  req: PostCustomAssignmentRequest,
) => {
  const url = buildUrlWithParams({
    url: API_URLS.ASSIGNMENT.CUSTOM,
    pathParams: { studyId },
  });

  return await customFetch.post<void>(url, req);
};
