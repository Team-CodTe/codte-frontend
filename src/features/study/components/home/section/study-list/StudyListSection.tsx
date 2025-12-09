'use client';

import { StudyListTable } from './StudyListTable';
import {
  currentUserMemberships,
  studyListTableColumns,
} from './StudyListTableColumns';
import { StudyListTableHeader } from './StudyListTableHeader';

export const StudyListSection = () => {
  return (
    <div className="flex w-full flex-col space-y-3">
      <StudyListTableHeader />
      <StudyListTable
        data={currentUserMemberships}
        columns={studyListTableColumns}
      />
    </div>
  );
};
