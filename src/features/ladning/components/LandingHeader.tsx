'use client';

import { mockStudy } from '@/api/mock/mockStudy';
import { AppLogo } from '@/components/logos/AppLogo';
import { GitHubLogo } from '@/components/logos/GitHubLogo';
import { Button } from '@/components/ui/Button';

export const LandingHeader = () => {
  return (
    <header className="bg-background fixed top-0 left-0 z-10 w-full px-6 py-4">
      <div className="relative flex items-center justify-between">
        <AppLogo className="h-9 w-auto" />

        <p className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          {mockStudy.name}
        </p>

        <Button
          className="bg-foreground text-background hover:bg-foreground/90"
          onClick={() => {
            console.log('Login with GitHub');
          }}>
          <GitHubLogo />
          GitHub 계정으로 로그인
        </Button>
      </div>
    </header>
  );
};
