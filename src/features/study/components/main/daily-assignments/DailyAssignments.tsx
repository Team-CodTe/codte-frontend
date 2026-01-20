'use client';

import { type GetDailyAssignmentsResponse } from '@/api/assignment/getDailyAssignments/type';
import { useDailyAssignments } from '@/features/study/hooks/assignment/useDailyAssignments';
import type { StudyRole } from '@/types/studyRole';

import { dailyAssignmentsColumns } from './DailyAssignmentsColumns';
import { DailyAssignmentsTable } from './DailyAssignmentsTable';
import { DailyAssignmentsTableFooter } from './DailyAssignmentsTableFooter';

type Props = {
  studyId: number;
  initialData: GetDailyAssignmentsResponse;
  role: StudyRole;
};

export const DailyAssignments = ({ studyId, initialData, role }: Props) => {
  const { data, isRefreshing, handleRefreshDailyAssignments } =
    useDailyAssignments({
      initialData,
    });

  return (
    <div className="flex min-h-0 flex-col gap-3 lg:h-full">
      <DailyAssignmentsTable
        data={data?.assignments ?? []}
        columns={dailyAssignmentsColumns({ studyId })}
      />

      <DailyAssignmentsTableFooter
        refreshedAt={data?.refreshedAt ?? ''}
        isRefreshing={isRefreshing}
        onRefresh={handleRefreshDailyAssignments}
        role={role}
      />
    </div>
  );
};
