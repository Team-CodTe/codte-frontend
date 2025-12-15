import { StudiesSuspense } from '@/features/study/suspenses/StudiesSuspense';

import { StudiesTableHeader } from './studies/StudiesTableHeader';

export const StudiesSection = () => {
  return (
    <div className="flex w-full flex-col space-y-3">
      <StudiesTableHeader />
      <StudiesSuspense />
    </div>
  );
};
