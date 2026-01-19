'use client';

import { useMembersQuery } from '@/api/study/getMembers/query';
import { type GetMembersResponse } from '@/api/study/getMembers/type';

import { membersColumns } from './MembersColumns';
import { MembersTable } from './MembersTable';

type Props = {
  studyId: number;
  initialData: GetMembersResponse[];
};

export const Members = ({ studyId, initialData }: Props) => {
  const { data } = useMembersQuery(studyId, { initialData });

  return <MembersTable data={data ?? []} columns={membersColumns} />;
};
