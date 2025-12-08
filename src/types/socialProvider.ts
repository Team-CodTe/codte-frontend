export const SOCIAL_PROVIDER = {
  GOOGLE: 'google',
  GITHUB: 'github',
} as const;

export type SocialProvider =
  (typeof SOCIAL_PROVIDER)[keyof typeof SOCIAL_PROVIDER];
