import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import {
  type PostCreateNoteRequest,
  type PostCreateNoteResponse,
} from './type';

export const postCreateNote = async (
  studyId: number,
  req: PostCreateNoteRequest,
) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.CREATE,
    pathParams: { studyId },
  });

  return await customFetch.post<PostCreateNoteResponse>(url, req);
};
