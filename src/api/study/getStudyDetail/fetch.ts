import { cache } from 'react';

import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetStudyDetailResponse } from './type';

export const getStudyDetail = cache(async (studyId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.STUDY.DETAIL,
    pathParams: { studyId },
  });

  return await customFetch.get<GetStudyDetailResponse>(url);
});
