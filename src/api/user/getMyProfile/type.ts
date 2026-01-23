export type GetMyProfileResponse = {
  id: number;
  provider: string;
  email: string;
  username: string;
  bojUsername?: string;
  profileImgUrl?: string;
  createdAt: string;
};
