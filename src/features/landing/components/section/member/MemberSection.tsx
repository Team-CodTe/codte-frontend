'use client';

import { MOCK_STUDY_MEMBERS } from '@/api/mock/mockStudyMember';

import { MemberTable } from './MemberTable';
import { memberTableColumns } from './MemberTableColumns';
import { MemberTableFooter } from './MemberTableFooter';
import { MemberTableHeader } from './MemberTableHeader';

export const MemberSection = () => {
  return (
    <div className="flex min-h-0 flex-col space-y-3 md:flex-1">
      <MemberTableHeader />
      <MemberTable data={MOCK_STUDY_MEMBERS} columns={memberTableColumns} />
      <MemberTableFooter />
    </div>
  );
};
