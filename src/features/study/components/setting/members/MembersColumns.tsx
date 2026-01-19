import { type GetMembersResponse } from '@/api/study/getMembers/type';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/formatFunc';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

const ROLE_LABEL: Record<StudyRole, string> = {
  [STUDY_ROLE.OWNER]: '스터디장',
  [STUDY_ROLE.MEMBER]: '멤버',
};

export const membersColumns: ColumnDef<GetMembersResponse>[] = [
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
    header: '이름',
    meta: { className: 'w-[20%]' },
    cell: ({ row }) => {
      return <span>{row.original.username}</span>;
    },
  },
  {
    accessorKey: 'email',
    header: '이메일',
    meta: { className: 'w-[30%]' },
    cell: ({ row }) => {
      return <span>{row.original.email}</span>;
    },
  },
  {
    accessorKey: 'bojUsername',
    header: '백준 계정',
    meta: { className: 'w-[15%]' },
    cell: ({ row }) => {
      return (
        <Link
          id={`boj-username-link-${row.original.bojUsername}`}
          aria-label={`${row.original.bojUsername} Solved.ac 프로필로 이동`}
          href={`https://solved.ac/profile/${row.original.bojUsername}`}
          target="_blank"
          rel="noreferrer"
          className="hover:underline">
          {row.original.bojUsername}
        </Link>
      );
    },
  },
  {
    accessorKey: 'joinedAt',
    header: '가입일',
    meta: { className: 'w-[25%]' },
    cell: ({ row }) => {
      return (
        <span>{formatDate(row.original.joinedAt, { includeTime: false })}</span>
      );
    },
  },
];
