'use client';

import {
  VIEW_METHOD,
  type ViewMethod,
} from '@/api/solve-status/getSolveStatus/type';
import { Skeleton } from '@/components/ui/Skeleton';

import { solveStatusGroupColumns } from './group/SolveStatusGroupColumns';
import { solveStatusMeColumns } from './me/SolveStatusMeColumns';
import { SolveStatusTable } from './SolveStatusGroupTable';

type Props = {
  view?: ViewMethod;
};

export const SolveStatusFallback = ({ view }: Props) => {
  return (
    <div className="flex min-h-0 flex-col gap-3 lg:h-full">
      {view === VIEW_METHOD.GROUP ? (
        <SolveStatusTable
          data={[]}
          columns={solveStatusGroupColumns}
          isLoading={true}
        />
      ) : (
        <SolveStatusTable
          data={[]}
          columns={solveStatusMeColumns}
          isLoading={true}
        />
      )}

      <div className="text-muted-foreground flex flex-row items-center justify-between gap-3 text-xs">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
};
