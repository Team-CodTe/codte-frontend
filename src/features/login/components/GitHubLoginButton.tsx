'use client';

import { BsGithub } from 'react-icons/bs';

import { Button } from '@/components/ui/Button';

export const GitHubLoginButton = () => {
  return (
    <Button
      className="bg-foreground text-background hover:bg-foreground/90"
      onClick={() => {
        console.log('Login with GitHub');
      }}>
      <BsGithub />
      GitHub 계정으로 로그인
    </Button>
  );
};
