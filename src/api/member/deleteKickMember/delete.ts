import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

export const deleteKickMember = async (studyId: number, memberId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.MEMBER.KICK,
    pathParams: { studyId, memberId },
  });

  return await customFetch.delete<void>(url);
};
