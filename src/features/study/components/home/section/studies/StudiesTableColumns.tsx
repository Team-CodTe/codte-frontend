import { type GetMyStudiesResponse } from '@/api/study/getMyStudies/type';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/formatDate';
import { STUDY_ROLE, type StudyRole } from '@/types/studyRole';
import { type ColumnDef } from '@tanstack/react-table';

const ROLE_LABEL: Record<StudyRole, string> = {
  [STUDY_ROLE.OWNER]: '스터디장',
  [STUDY_ROLE.MEMBER]: '멤버',
};

export const studiesTableColumns: ColumnDef<GetMyStudiesResponse>[] = [
  {
    accessorKey: 'studyName',
    header: '스터디 이름',
    meta: { className: 'w-[40%]' },
    cell: ({ row }) => {
      const studyName = row.original.studyName;

      return (
        <div className="max-w-64 truncate" title={studyName}>
          {studyName}
        </div>
      );
    },
  },
  {
    accessorKey: 'memberCount',
    header: '스터디원 수',
    meta: { className: 'w-[20%]' },
    cell: ({ row }) => `${row.original.memberCount}명`,
  },
  {
    accessorKey: 'role',
    header: '역할',
    meta: { className: 'w-[20%]' },
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.role === STUDY_ROLE.OWNER ? 'default' : 'secondary'
        }>
        {ROLE_LABEL[row.original.role]}
      </Badge>
    ),
  },
  {
    accessorKey: 'joinedAt',
    header: '가입일',
    meta: { className: 'w-[20%]' },
    cell: ({ row }) =>
      formatDate(row.original.joinedAt, { includeTime: false }),
  },
];
