import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetNoteReviewResponse } from '../getNoteReview/type';

const REVIEW_TIMEOUT_MS = 60000 * 5; // 5분

export const postCreateNoteReview = async (noteId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.REVIEW,
    pathParams: { noteId },
  });

  return await customFetch.post<GetNoteReviewResponse>(url, undefined, {
    timeout: REVIEW_TIMEOUT_MS,
  });
};
