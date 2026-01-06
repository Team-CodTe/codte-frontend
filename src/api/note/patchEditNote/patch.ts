import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type EditNoteRequest } from './type';

export const patchEditNote = async (noteId: number, req: EditNoteRequest) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.UPDATE,
    pathParams: { noteId },
  });

  return await customFetch.patch<void>(url, req);
};
