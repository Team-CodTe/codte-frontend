import { MOCK_STUDY } from '@/api/mock/mockStudy';
import { HintTooltip } from '@/components/common/HintTooltip';
import { AppLogo } from '@/components/logos/AppLogo';

import { ToLoginPageButton } from './ToLoginPageButton';

export const LandingHeader = () => {
  return (
    <header className="relative flex h-16 w-full items-center justify-between px-5 lg:px-8">
      <div className="flex items-center">
        <AppLogo className="h-8 w-auto" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <HintTooltip
          content="실제 볼 수 있는 스터디 화면이에요. 한 번 살펴보고 시작해보세요."
          side="bottom">
          <span className="hidden font-medium sm:block">
            {MOCK_STUDY[0].name}
          </span>
        </HintTooltip>
      </div>

      <ToLoginPageButton />
    </header>
  );
};
