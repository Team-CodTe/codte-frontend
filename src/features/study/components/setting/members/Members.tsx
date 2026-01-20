'use client';

import { useMembersQuery } from '@/api/member/getMembers/query';
import { type GetMembersResponse } from '@/api/member/getMembers/type';
import { useStudyDetailQuery } from '@/api/study/getStudyDetail/query';

import { membersColumns } from './MembersColumns';
import { MembersTable } from './MembersTable';

type Props = {
  studyId: number;
  initialData: GetMembersResponse[];
};

export const Members = ({ studyId, initialData }: Props) => {
  const { data: study } = useStudyDetailQuery(studyId);
  const { data: members } = useMembersQuery(studyId, { initialData });

  return (
    <MembersTable
      data={members ?? []}
      columns={membersColumns({ myRole: study?.myRole })}
    />
  );
};
