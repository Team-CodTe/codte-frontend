'use client';

import { type GetDailyAssignmentsResponse } from '@/api/assignment/getDailyAssignments/type';
import { useDailyAssignments } from '@/features/study/hooks/useDailyAssignments';
import type { StudyRole } from '@/types/studyRole';

import { dailyAssignmentsTableColumns } from './DailyAssignmentsColumns';
import { DailyAssignmentsTable } from './DailyAssignmentsTable';
import { DailyAssignmentsTableFooter } from './DailyAssignmentsTableFooter';

type Props = {
  studyId: number;
  initialData: GetDailyAssignmentsResponse;
  role: StudyRole;
};

export const DailyAssignments = ({ studyId, initialData, role }: Props) => {
  const { data, isRefreshing, handleRefresh } = useDailyAssignments({
    initialData,
  });

  return (
    <div className="flex min-h-0 flex-col gap-3 lg:h-full">
      <DailyAssignmentsTable
        data={data?.assignments ?? []}
        columns={dailyAssignmentsTableColumns({ studyId })}
      />

      <DailyAssignmentsTableFooter
        refreshedAt={data?.refreshedAt ?? ''}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        role={role}
      />
    </div>
  );
};
