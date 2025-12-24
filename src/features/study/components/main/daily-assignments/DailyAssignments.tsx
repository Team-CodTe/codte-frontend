'use client';

import { type GetDailyAssignmentsResponse } from '@/api/assignment/getDailyAssignments/type';
import { useDailyAssignments } from '@/features/study/hooks/useDailyAssignments';

import { DailyAssignmentsTableColumns } from './DailyAssignmentsColumns';
import { DailyAssignmentsTable } from './DailyAssignmentsTable';
import { DailyAssignmentsTableFooter } from './DailyAssignmentsTableFooter';

type Props = {
  studyId: number;
  initialData: GetDailyAssignmentsResponse;
};

export const DailyAssignments = ({ studyId, initialData }: Props) => {
  const { data, isRefreshing, onRefresh } = useDailyAssignments({
    studyId,
    initialData,
  });

  return (
    <div className="flex min-h-0 flex-col gap-3 lg:h-full">
      <DailyAssignmentsTable
        data={data?.assignments ?? []}
        columns={DailyAssignmentsTableColumns}
      />

      <DailyAssignmentsTableFooter
        refreshedAt={data?.refreshedAt ?? ''}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </div>
  );
};
