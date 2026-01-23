'use client';

import { Skeleton } from '@/components/ui/Skeleton';

import { dailyAssignmentsColumns } from './DailyAssignmentsColumns';
import { DailyAssignmentsTable } from './DailyAssignmentsTable';

export const DailyAssignmentsFallback = () => {
  return (
    <div className="flex min-h-0 flex-col gap-3 lg:h-full">
      <DailyAssignmentsTable
        data={[]}
        columns={dailyAssignmentsColumns({ studyId: undefined })}
        isLoading={true}
      />

      <div className="text-muted-foreground flex flex-row items-center justify-between gap-3 text-xs">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
};
