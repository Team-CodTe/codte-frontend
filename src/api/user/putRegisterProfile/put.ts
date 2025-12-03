import { API_URLS } from '@/api/apiUrls';
import { instance } from '@/lib/axios';

import {
  type PutRegisterProfileRequest,
  type PutRegisterProfileResponse,
} from './type';

export const putRegisterProfile = async (req: PutRegisterProfileRequest) => {
  const { data } = await instance.put<PutRegisterProfileResponse>(
    API_URLS.USER.REGISTER,
    req,
  );

  return data;
};
