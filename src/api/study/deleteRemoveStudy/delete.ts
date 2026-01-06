import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

export const deleteRemoveStudy = async (studyId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.STUDY.REMOVE,
    pathParams: { studyId },
  });

  return await customFetch.delete<void>(url);
};
