'use client';

import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { SOCIAL_PROVIDER } from '@/types/socialProvider';
import { Roboto } from 'next/font/google';

const robotoMedium = Roboto({
  weight: '500',
});

export const LoginButtons = () => {
  const { handleLogin, loadingProvider } = useAuth();

  const isGithubLoading = loadingProvider === SOCIAL_PROVIDER.GITHUB;
  const isGoogleLoading = loadingProvider === SOCIAL_PROVIDER.GOOGLE;

  const isAnyLoading = loadingProvider !== null;

  return (
    <div className="flex w-full max-w-72 min-w-48 flex-col gap-2">
      <Button
        variant="outline"
        size="lg"
        onClick={() => handleLogin(SOCIAL_PROVIDER.GITHUB)}
        disabled={isAnyLoading}>
        {isGithubLoading ? <Spinner /> : <BsGithub />}
        {isGithubLoading ? 'GitHub 로그인 중...' : 'GitHub'}
      </Button>
      <Button
        variant="outline"
        size="lg"
        className={robotoMedium.className}
        onClick={() => handleLogin(SOCIAL_PROVIDER.GOOGLE)}
        disabled={isAnyLoading}>
        {isGoogleLoading ? <Spinner /> : <FcGoogle />}
        {isGoogleLoading ? 'Google 로그인 중...' : 'Google'}
      </Button>
    </div>
  );
};
