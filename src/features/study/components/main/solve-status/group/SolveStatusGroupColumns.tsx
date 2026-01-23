import { type GroupMemberItem } from '@/api/solve-status/getSolveStatus/type';
import { type ColumnDef } from '@tanstack/react-table';
import { BookOpenCheckIcon, CodeXmlIcon } from 'lucide-react';

import { AssignmentStatusBadge } from './AssignmentStatusBadge';
import { StatusSummaryBadge } from './StatusSummaryBadge';

export const solveStatusGroupColumns: ColumnDef<GroupMemberItem>[] = [
  {
    accessorKey: 'username',
    header: '이름',
    meta: { className: 'w-[15%]' },
    cell: ({ row }) => (
      <span className="block max-w-32 truncate" title={row.original.username}>
        {row.original.username}
      </span>
    ),
  },
  {
    accessorKey: 'statusSummary',
    header: '풀이 상태 요약',
    meta: { className: 'w-[15%]' },
    cell: ({ row }) => {
      const { problemStatusSummary, noteStatusSummary, totalCount } =
        row.original;

      return (
        <div className="flex flex-row items-center gap-3">
          <StatusSummaryBadge
            currentCount={problemStatusSummary.completedCount}
            totalCount={totalCount}
            Icon={CodeXmlIcon}
            label="문제 풀이 개수"
          />
          <StatusSummaryBadge
            currentCount={noteStatusSummary.completedCount}
            totalCount={totalCount}
            Icon={BookOpenCheckIcon}
            label="풀이 글 작성 개수"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'assignmentStatus',
    header: '풀이 상태',
    meta: { className: 'w-[70%]' },
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-3">
        {row.original.assignments.map((assignment) => (
          <AssignmentStatusBadge
            key={assignment.problemId}
            assignment={assignment}
          />
        ))}
      </div>
    ),
  },
];
