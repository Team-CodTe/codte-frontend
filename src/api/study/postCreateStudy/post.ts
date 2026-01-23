import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import {
  type postCreateStudyRequest,
  type postCreateStudyResponse,
} from './type';

export const postCreateStudy = async (req: postCreateStudyRequest) => {
  return await customFetch.post<postCreateStudyResponse>(
    API_URLS.STUDY.CREATE,
    req,
  );
};
