import { Separator } from '@/components/ui/Separator';

import { ProfileDeleteRow } from './ProfileDeleteRow';

export const ProfileDangerZoneSection = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">중요 설정</h2>
        <Separator />
      </div>
      <ProfileDeleteRow />
    </div>
  );
};
