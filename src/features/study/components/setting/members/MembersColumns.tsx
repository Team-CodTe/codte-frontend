import { type GetMembersResponse } from '@/api/member/getMembers/type';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/formatFunc';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { MemberActionCell } from './MemberActionCell';

const ROLE_LABEL: Record<StudyRole, string> = {
  [STUDY_ROLE.OWNER]: '스터디장',
  [STUDY_ROLE.MEMBER]: '멤버',
};

type Props = {
  myRole?: StudyRole | undefined;
};

export const membersColumns = ({
  myRole,
}: Props): ColumnDef<GetMembersResponse>[] => {
  const baseColumns: ColumnDef<GetMembersResponse>[] = [
    {
      accessorKey: 'role',
      header: '역할',
      meta: { className: 'w-[10%]' },
      cell: ({ row }) => {
        const role = row.original.role;

        return (
          <Badge variant={role === STUDY_ROLE.OWNER ? 'default' : 'secondary'}>
            {ROLE_LABEL[role]}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'username',
      header: '닉네임',
      meta: { className: 'w-[20%]' },
      cell: ({ row }) => <span>{row.original.username}</span>,
    },
    {
      accessorKey: 'email',
      header: '이메일',
      meta: { className: 'w-[30%]' },
      cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      accessorKey: 'bojUsername',
      header: '백준 계정',
      meta: { className: 'w-[20%]' },
      cell: ({ row }) => (
        <Link
          href={`https://solved.ac/profile/${row.original.bojUsername}`}
          target="_blank"
          rel="noreferrer"
          className="hover:underline">
          {row.original.bojUsername}
        </Link>
      ),
    },
    {
      accessorKey: 'joinedAt',
      header: '가입일',
      meta: { className: 'w-[20%]' },
      cell: ({ row }) => (
        <span>{formatDate(row.original.joinedAt, { includeTime: false })}</span>
      ),
    },
  ];

  if (myRole === STUDY_ROLE.OWNER) {
    baseColumns.push({
      accessorKey: 'actions',
      header: () => <span className="sr-only">관리</span>,
      meta: { className: 'min-w-0 w-0 whitespace-nowrap' },
      cell: ({ row }) => {
        if (row.original.role === STUDY_ROLE.OWNER) {
          return null;
        }

        return (
          <MemberActionCell
            memberName={row.original.username}
            memberId={row.original.id}
          />
        );
      },
    });
  }

  return baseColumns;
};
