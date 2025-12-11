export type PostJoinStudyRequest = {
  inviteCode: string;
};

export type PostJoinStudyResponse = {
  message: string;
  studyId: string;
};
