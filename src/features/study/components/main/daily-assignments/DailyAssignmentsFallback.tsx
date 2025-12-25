'use client';

import { Skeleton } from '@/components/ui/Skeleton';

import { DAILY_ASSIGNMENTS_TABLE_COLUMNS } from './DailyAssignmentsColumns';
import { DailyAssignmentsTable } from './DailyAssignmentsTable';

export const DailyAssignmentsFallback = () => {
  return (
    <div className="flex min-h-0 flex-col gap-3 lg:h-full">
      <DailyAssignmentsTable
        data={[]}
        columns={DAILY_ASSIGNMENTS_TABLE_COLUMNS}
        isLoading={true}
      />

      <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
};
