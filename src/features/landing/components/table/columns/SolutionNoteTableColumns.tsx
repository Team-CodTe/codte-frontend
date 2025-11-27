import { MOCK_DAILY_ASSIGNMENT } from '@/api/mock/mockDailyAssignment';
import { type SolutionNoteResponse } from '@/api/types/solutionDto';
import { TierBadge } from '@/components/common/TierBadge';
import { formatDate } from '@/lib/formatDate';
import { type ColumnDef } from '@tanstack/react-table';

const getAssignedAt = (problemId: number) => {
  const assignment = MOCK_DAILY_ASSIGNMENT.find(
    (a) => a.problem.id === problemId,
  );

  return assignment ? assignment.assignedDate : null;
};

export const solutionNoteTableColumns: ColumnDef<SolutionNoteResponse>[] = [
  {
    accessorKey: 'assignAt',
    header: '문제 추천 날짜',
    meta: {
      className: 'w-[25%]',
    },
    cell: ({ row }) => {
      const problemId = row.original.problem.id;
      const date = getAssignedAt(problemId);

      return date ? <div>{formatDate(date, { includeTime: false })}</div> : '-';
    },
  },
  {
    accessorKey: 'problemId',
    header: '문제 번호',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => {
      const problem = row.original.problem;

      return (
        <div className="flex items-center gap-2">
          <TierBadge level={problem.tier} />
          <a
            href={problem.link}
            target="_blank"
            rel="noreferrer"
            className="hover:underline">
            {problem.bojNumber}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: 'userName',
    header: '작성자',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => (
      <div>
        <span>{row.original.user.username}</span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: '작성일',
    meta: {
      className: 'w-[30%]',
    },
    cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
  },
];
