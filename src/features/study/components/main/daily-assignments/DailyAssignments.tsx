'use client';

import { useDailyAssignmentsQuery } from '@/api/daily-assignment/getDailyAssignments/query';
import { type GetDailyAssignmentsResponse } from '@/api/daily-assignment/getDailyAssignments/type';

import { DailyAssignmentsTableColumns } from './DailyAssignmentsColumns';
import { DailyAssignmentsTable } from './DailyAssignmentsTable';

type Props = {
  studyId: number;
  initialData: GetDailyAssignmentsResponse;
};

export const DailyAssignments = ({ studyId, initialData }: Props) => {
  const { data } = useDailyAssignmentsQuery(studyId, { initialData });

  console.log(data?.assignments);

  return (
    <DailyAssignmentsTable
      data={data?.assignments ?? []}
      columns={DailyAssignmentsTableColumns}
    />
  );
};
