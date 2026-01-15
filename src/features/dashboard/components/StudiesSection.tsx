import { StudiesSuspense } from '@/features/dashboard/suspenses/StudiesSuspense';

import { StudiesTableHeader } from './studies/StudiesTableHeader';

export const StudiesSection = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <StudiesTableHeader />
      <StudiesSuspense />
    </div>
  );
};
