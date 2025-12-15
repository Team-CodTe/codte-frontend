import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

export const deleteLeaveStudy = (id: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.STUDY.LEAVE,
    pathParams: { id },
  });

  return customFetch.delete<void>(url);
};
