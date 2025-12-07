'use client';

import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { SocialProvider } from '@/types/socialProvider';
import { Roboto } from 'next/font/google';

const robotoMedium = Roboto({
  weight: '500',
});

export const LoginButtons = () => {
  const { login, loadingProvider } = useAuth();

  const isGithubLoading = loadingProvider === SocialProvider.GITHUB;
  const isGoogleLoading = loadingProvider === SocialProvider.GOOGLE;

  const isAnyLoading = loadingProvider !== null;

  return (
    <div className="flex w-full max-w-72 min-w-48 flex-col gap-2">
      <Button
        variant="outline"
        size="lg"
        onClick={() => login(SocialProvider.GITHUB)}
        disabled={isAnyLoading}>
        {isGithubLoading ? <Spinner /> : <BsGithub />}
        {isGithubLoading ? 'GitHub 로그인 중...' : 'GitHub'}
      </Button>
      <Button
        variant="outline"
        size="lg"
        className={robotoMedium.className}
        onClick={() => login(SocialProvider.GOOGLE)}
        disabled={isAnyLoading}>
        {isGoogleLoading ? <Spinner /> : <FcGoogle />}
        {isGoogleLoading ? 'Google 로그인 중...' : 'Google'}
      </Button>
    </div>
  );
};
