'use client';

import { membersColumns } from './MembersColumns';
import { MembersTable } from './MembersTable';

export const MembersFallback = () => {
  return (
    <MembersTable
      data={[]}
      columns={membersColumns({ myRole: undefined })}
      isLoading={true}
    />
  );
};
