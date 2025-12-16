import { API_URLS } from '@/api/apiUrls';
import { customFetch } from '@/lib/fetchInstance';

import { type PostJoinStudyRequest, type PostJoinStudyResponse } from './type';

export const postJoinStudy = async (req: PostJoinStudyRequest) => {
  return await customFetch.post<PostJoinStudyResponse>(
    API_URLS.STUDY.JOIN,
    req,
  );
};
