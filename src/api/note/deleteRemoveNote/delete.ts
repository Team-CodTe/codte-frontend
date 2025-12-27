import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

export const deleteRemoveNote = async (noteId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.REMOVE,
    pathParams: { noteId },
  });

  return await customFetch.delete<void>(url);
};
