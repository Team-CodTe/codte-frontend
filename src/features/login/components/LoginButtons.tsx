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
    <div className="flex w-full max-w-xs min-w-48 flex-col gap-2">
      <Button
        className="bg-foreground text-background hover:bg-foreground/90"
        onClick={() => login(SocialProvider.GITHUB)}
        disabled={isAnyLoading}>
        {isGithubLoading ? <Spinner /> : <BsGithub />}
        {isGithubLoading ? 'GitHub 로그인 중...' : 'GitHub 계정으로 로그인'}
      </Button>
      <Button
        variant="secondary"
        className={robotoMedium.className}
        onClick={() => login(SocialProvider.GOOGLE)}
        disabled={isAnyLoading}>
        {isGoogleLoading ? <Spinner /> : <FcGoogle />}
        {isGoogleLoading ? 'Google 로그인 중...' : 'Google 계정으로 로그인'}
      </Button>
    </div>
  );
};
