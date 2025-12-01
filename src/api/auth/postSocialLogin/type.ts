export type PostSocialLoginRequest = {
  provider: string;
  access_token: string;
};

export type PostSocialLoginResponse = {
  user: {
    id: number;
    provider: string;
    email: string;
    username: string;
    boj_username: string;
    profile_img_url: string;
  };
  requires_registration: boolean;
};
