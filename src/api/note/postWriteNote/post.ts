import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type PostWriteNoteRequest, type PostWriteNoteResponse } from './type';

export const postWriteNote = async (
  studyId: number,
  req: PostWriteNoteRequest,
) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.CREATE,
    pathParams: { studyId },
  });

  return await customFetch.post<PostWriteNoteResponse>(url, req);
};
