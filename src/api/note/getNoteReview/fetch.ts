import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetNoteReviewResponse } from './type';

export const getNoteReview = async (noteId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.REVIEW,
    pathParams: { noteId },
  });

  return await customFetch.get<GetNoteReviewResponse>(url);
};
