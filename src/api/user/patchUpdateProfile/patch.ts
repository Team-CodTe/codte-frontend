import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import {
  type PatchUpdateProfileRequest,
  type PatchUpdateProfileResponse,
} from './type';

export const patchUpdateProfile = async (req: PatchUpdateProfileRequest) => {
  return await customFetch.patch<PatchUpdateProfileResponse>(
    API_URLS.USER.UPDATE,
    req,
  );
};
