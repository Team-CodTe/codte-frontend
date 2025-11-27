'use client';

import { GitHubLogo } from '@/components/logos/GitHubLogo';
import { Button } from '@/components/ui/Button';

export const GitHubLoginButton = () => {
  return (
    <Button
      className="bg-foreground text-background hover:bg-foreground/90"
      onClick={() => {
        console.log('Login with GitHub');
      }}>
      <GitHubLogo />
      GitHub 계정으로 로그인
    </Button>
  );
};
