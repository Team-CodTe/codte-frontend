import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetNoteTemplateResponse } from './type';

export const getNoteTemplate = async (studyId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.NOTE.TEMPLATE,
    pathParams: { studyId },
  });

  return await customFetch.get<GetNoteTemplateResponse>(url);
};
