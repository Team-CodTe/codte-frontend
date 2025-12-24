'use client';

import { useMemo } from 'react';

import { MOCK_DAILY_ASSIGNMENT } from '@/api/mock/mockDailyAssignment';

import { problemTableColumns } from './DailyAssignmentColumns';
import { DailyAssignmentTable } from './DailyAssignmentTable';
import { DailyAssignmentTableFooter } from './DailyAssignmentTableFooter';
import { DailyAssignmentTableHeader } from './DailyAssignmentTableHeader';

export const DailyAssignmentSection = () => {
  const data = useMemo(() => {
    return [...MOCK_DAILY_ASSIGNMENT].filter((assignment) => {
      return assignment.assignedDate === '2025-11-28';
    });
  }, []);

  return (
    <div className="flex min-h-0 flex-col gap-3 md:flex-1">
      <DailyAssignmentTableHeader />
      <DailyAssignmentTable data={data} columns={problemTableColumns} />
      <DailyAssignmentTableFooter />
    </div>
  );
};
