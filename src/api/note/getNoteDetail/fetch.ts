import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetNoteDetailResponse } from '../getNoteDetail/type';

export const getNoteDetail = async (noteId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.DETAIL,
    pathParams: { noteId },
  });

  return await customFetch.get<GetNoteDetailResponse>(url);
};
