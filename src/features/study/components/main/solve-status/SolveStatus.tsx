'use client';

import {
  type GetSolveStatusResponse,
  VIEW_METHOD,
  type ViewMethod,
} from '@/api/solve-status/getSolveStatus/type';
import { useSolveStatus } from '@/features/study/hooks/solve-status/useSolveStatus';

import { solveStatusGroupColumns } from './group/SolveStatusGroupColumns';
import { SolveStatusGroupTable } from './group/SolveStatusGroupTable';
import { SolveStatusTableFooter } from './SolveStatusTableFooter';

type Props = {
  initialData: GetSolveStatusResponse;
  view?: ViewMethod;
};

export const SolveStatus = ({ initialData, view }: Props) => {
  const { data, isRefreshing, handleRefresh } = useSolveStatus({
    initialData,
    view,
  });

  return (
    <div className="flex min-h-0 flex-col gap-3 lg:h-full">
      {data?.view === VIEW_METHOD.GROUP ? (
        <SolveStatusGroupTable
          data={data?.members ?? []}
          columns={solveStatusGroupColumns()}
        />
      ) : null}

      <SolveStatusTableFooter
        lastUpdatedAt={data?.lastUpdatedAt ?? ''}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </div>
  );
};
