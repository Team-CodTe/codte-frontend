import { AppLogo } from '@/components/logos/AppLogo';

import { DropdownAvatar } from '../DropdownAvatar';

export const StudyHomeHeader = () => {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-16 w-full items-center justify-between px-5 py-4 lg:px-6">
      <AppLogo className="h-8 w-auto" />
      <DropdownAvatar />
    </header>
  );
};
