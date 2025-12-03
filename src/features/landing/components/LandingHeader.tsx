import { MOCK_STUDY } from '@/api/mock/mockStudy';
import { HintTooltip } from '@/components/common/HintTooltip';
import { AppLogo } from '@/components/logos/AppLogo';

import { ToLoginPageButton } from './ToLoginPageButton';

export const LandingHeader = () => {
  return (
    <header className="flex w-full items-center justify-between px-5 py-4 lg:px-10">
      <div className="flex items-center gap-12">
        <AppLogo className="h-9 w-auto" />
        <HintTooltip
          content="실제 볼 수 있는 스터디 화면이에요. 한 번 살펴보고 시작해보세요."
          side="bottom">
          <span className="hidden font-medium sm:block">{MOCK_STUDY.name}</span>
        </HintTooltip>
      </div>

      <ToLoginPageButton />
    </header>
  );
};
