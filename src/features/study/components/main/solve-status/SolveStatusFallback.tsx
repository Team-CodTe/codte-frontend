'use client';

import {
  VIEW_METHOD,
  type ViewMethod,
} from '@/api/solve-status/getSolveStatus/type';
import { Skeleton } from '@/components/ui/Skeleton';

import { solveStatusGroupColumns } from './group/SolveStatusGroupColumns';
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
          columns={solveStatusGroupColumns()}
          isLoading={true}
        />
      ) : null}

      <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
};
