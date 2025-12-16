export type PatchUpdateProfileRequest = {
  username: string;
  bojUsername: string;
};

export type PatchUpdateProfileResponse = {
  id: number;
  provider: string;
  email: string;
  username: string;
  bojUsername?: string;
  profileImgUrl?: string;
  createdAt: string;
};
