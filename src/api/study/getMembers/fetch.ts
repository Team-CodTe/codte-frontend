import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

import { type GetMembersResponse } from './type';

export const getMembers = async (studyId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.STUDY.MEMBERS,
    pathParams: { studyId },
  });

  return await customFetch.get<GetMembersResponse[]>(url);
};
