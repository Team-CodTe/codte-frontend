import { type SocialProvider } from '@/types/socialProvider';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  nickname: string;
  provider: SocialProvider;
  bojUsername: string;
  profileImgUrl: string;
  createdAt: string;
}
