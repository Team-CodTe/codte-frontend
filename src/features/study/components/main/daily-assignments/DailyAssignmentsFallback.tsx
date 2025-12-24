'use client';

import { DAILY_ASSIGNMENTS_TABLE_COLUMNS } from './DailyAssignmentsColumns';
import { DailyAssignmentsTable } from './DailyAssignmentsTable';

export const DailyAssignmentsFallback = () => {
  return (
    <DailyAssignmentsTable
      data={[]}
      columns={DAILY_ASSIGNMENTS_TABLE_COLUMNS}
      isLoading={true}
    />
  );
};
