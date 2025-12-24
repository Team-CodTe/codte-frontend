import { type DailyAssignment } from '@/api/assignment/getDailyAssignments/type';
import { TierBadge } from '@/components/common/TierBadge';
import { Badge } from '@/components/ui/Badge';
import { type ColumnDef } from '@tanstack/react-table';

export const DAILY_ASSIGNMENTS_TABLE_COLUMNS: ColumnDef<DailyAssignment>[] = [
  {
    accessorKey: 'problemId',
    header: '문제 번호',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => {
      const assignment = row.original;

      return (
        <div className="flex items-center gap-2">
          <TierBadge level={assignment.tier} />
          <a href={assignment.link} target="_blank" rel="noreferrer">
            {assignment.bojNumber}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: 'problemTitle',
    header: '제목',
    meta: {
      className: 'w-[40%]',
    },
    cell: ({ row }) => {
      const assignment = row.original;
      const isCustom = assignment.isCustom === true;

      return (
        <div className="flex flex-row items-center gap-2">
          <a href={assignment.link} target="_blank" rel="noreferrer">
            {assignment.title}
          </a>
          {isCustom && <Badge variant="secondary">추가됨</Badge>}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: '문제 풀이 글',
    meta: {
      className: 'w-[20%]',
    },
    cell: () => {
      /** @todo 아직 작성하지 않은 문제에 대해서 작성하기 API 구현 */
      return <button>작성하기</button>;
    },
  },
];
