import { type GetMyProfileResponse } from '@/api/user/getMyProfile/type';
import { AppLogo } from '@/components/logos/AppLogo';

import { DropdownAvatar } from '../DropdownAvatar';

type Props = {
  user: GetMyProfileResponse;
};

export const StudyHomeHeader = ({ user }: Props) => {
  return (
    <header className="bg-background sticky top-0 z-50 flex h-16 w-full items-center justify-between px-5 lg:px-8">
      <AppLogo className="h-8 w-auto" />
      <DropdownAvatar user={user} />
    </header>
  );
};
