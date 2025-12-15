import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import {
  type patchUpdateStudyRequest,
  type patchUpdateStudyResponse,
} from './type';

export const patchUpdateStudy = async (
  id: number,
  req: patchUpdateStudyRequest,
) => {
  const url = buildUrlWithParams({
    url: API_URLS.STUDY.UPDATE,
    pathParams: { id },
  });

  return await customFetch.patch<patchUpdateStudyResponse>(url, req);
};
