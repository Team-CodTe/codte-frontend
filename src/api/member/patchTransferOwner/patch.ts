import { API_URLS } from '@/api/apiUrls';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { customFetch } from '@/lib/fetchInstance';

export const patchTransferOwner = async (studyId: number, memberId: number) => {
  const url = buildUrlWithParams({
    url: API_URLS.MEMBER.TRANSFER_OWNER,
    pathParams: { studyId, memberId },
  });

  return await customFetch.patch<void>(url);
};
