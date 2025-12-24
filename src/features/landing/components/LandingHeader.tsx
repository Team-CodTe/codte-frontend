import { MOCK_STUDY } from '@/api/mock/mockStudy';
import { HintTooltip } from '@/components/common/HintTooltip';
import { AppLogo } from '@/components/logos/AppLogo';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';

import { ToLoginPageButton } from './ToLoginPageButton';

export const LandingHeader = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between gap-4 px-5 lg:px-8">
      <Breadcrumb className="min-w-0 flex-1">
        <BreadcrumbList className="flex-nowrap">
          <BreadcrumbItem>
            <BreadcrumbPage>
              <AppLogo className="h-8 w-auto" />
            </BreadcrumbPage>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <HintTooltip
            content="실제 볼 수 있는 스터디 화면이에요. 한 번 살펴보고 시작해보세요."
            side="bottom">
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="block truncate">
                {MOCK_STUDY[0].name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </HintTooltip>
        </BreadcrumbList>
      </Breadcrumb>

      <ToLoginPageButton />
    </header>
  );
};
