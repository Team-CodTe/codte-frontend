export type GetMyProfileResponse = {
  id: number;
  provider: string;
  email: string;
  username: string;
  boj_username?: string;
  profile_img_url?: string;
  created_at: string;
};
