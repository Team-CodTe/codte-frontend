'use client';

import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { Roboto } from 'next/font/google';

const robotoMedium = Roboto({
  weight: '500',
});

export const LoginButtons = () => {
  const { login, loadingProvider } = useAuth();

  const isGithubLoading = loadingProvider === 'github';
  const isGoogleLoading = loadingProvider === 'google';

  const isAnyLoading = loadingProvider !== null;

  return (
    <div className="flex w-full max-w-xs min-w-48 flex-col gap-2">
      <Button
        className="bg-foreground text-background hover:bg-foreground/90"
        onClick={() => login('github')}
        disabled={isAnyLoading}>
        {isGithubLoading ? <Spinner /> : <BsGithub />}
        {isGithubLoading ? 'GitHub 로그인 중...' : 'GitHub 계정으로 로그인'}
      </Button>
      <Button
        variant="secondary"
        className={robotoMedium.className}
        onClick={() => login('google')}
        disabled={isAnyLoading}>
        {isGoogleLoading ? <Spinner /> : <FcGoogle />}
        {isGoogleLoading ? 'Google 로그인 중...' : 'Google 계정으로 로그인'}
      </Button>
    </div>
  );
};
