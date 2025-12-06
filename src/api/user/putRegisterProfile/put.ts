import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import {
  type PutRegisterProfileRequest,
  type PutRegisterProfileResponse,
} from './type';

export const putRegisterProfile = async (req: PutRegisterProfileRequest) => {
  return await customFetch.put<PutRegisterProfileResponse>(
    API_URLS.USER.REGISTER,
    req,
  );
};
