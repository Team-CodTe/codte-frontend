import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetNoteDetailResponse } from '../getNoteDetail/type';
import { type UpdateNoteRequest } from './type';

export const patchUpdateNote = async (
  noteId: number,
  req: UpdateNoteRequest,
) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.UPDATE,
    pathParams: { noteId },
  });

  return await customFetch.patch<GetNoteDetailResponse>(url, req);
};
