'use client';

import { MOCK_STUDY } from '@/api/mock/mockStudy';
import { HintTooltip } from '@/components/common/HintTooltip';
import { AppLogo } from '@/components/logos/AppLogo';
import { GitHubLogo } from '@/components/logos/GitHubLogo';
import { Button } from '@/components/ui/Button';

export const LandingHeader = () => {
  return (
    <header className="bg-background w-full px-6 py-4">
      <div className="relative flex items-center justify-between">
        <AppLogo className="h-9 w-auto" />

        <HintTooltip
          content="실제 볼 수 있는 스터디 화면이에요. 한 번 살펴보고 시작해보세요."
          side="bottom">
          <span className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            {MOCK_STUDY.name}
          </span>
        </HintTooltip>

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
