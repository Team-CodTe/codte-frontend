'use client';

import { DailyAssignmentsTableColumns } from './DailyAssignmentsColumns';
import { DailyAssignmentsTable } from './DailyAssignmentsTable';

export const DailyAssignmentsFallback = () => {
  return (
    <DailyAssignmentsTable
      data={[]}
      columns={DailyAssignmentsTableColumns}
      isLoading={true}
    />
  );
};
