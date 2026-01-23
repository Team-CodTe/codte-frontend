export type PostSocialLoginRequest = {
  provider: string;
  accessToken: string;
};

export type PostSocialLoginResponse = {
  user: {
    id: number;
    provider: string;
    email: string;
    username: string;
    bojUsername: string;
    profileImgUrl: string;
  };
  isRegistered: boolean;
};
