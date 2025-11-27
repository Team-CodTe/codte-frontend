export enum Provider {
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  nickname: string;
  provider: Provider;
  bojUsername: string;
  profileImgUrl: string;
  createdAt: string;
}
