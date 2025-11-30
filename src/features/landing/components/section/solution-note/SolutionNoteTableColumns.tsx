import { MOCK_DAILY_ASSIGNMENT } from '@/api/mock/mockDailyAssignment';
import { MOCK_PROBLEMS } from '@/api/mock/mockProblem';
import { MOCK_USERS } from '@/api/mock/mockUser';
import { type SolutionNoteResponse } from '@/api/types/solutionDto';
import { TierBadge } from '@/components/common/TierBadge';
import { formatDate } from '@/lib/formatDate';
import { type ColumnDef } from '@tanstack/react-table';

const getAssignedAt = (problemId: number) => {
  const assignment = MOCK_DAILY_ASSIGNMENT.find(
    (a) => a.problemId === problemId,
  );

  return assignment ? assignment.assignedDate : null;
};

const problemMap = new Map(MOCK_PROBLEMS.map((p) => [p.id, p]));
const userMap = new Map(MOCK_USERS.map((u) => [u.id, u]));

export const solutionNoteTableColumns: ColumnDef<SolutionNoteResponse>[] = [
  {
    accessorKey: 'assignAt',
    header: '문제 추천 날짜',
    meta: {
      className: 'w-[25%]',
    },
    cell: ({ row }) => {
      const problemId = row.original.problemId;
      const date = getAssignedAt(problemId);

      if (!date) return '-';

      return <div>{formatDate(date, { includeTime: false })}</div>;
    },
  },
  {
    accessorKey: 'problemId',
    header: '문제 번호',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => {
      const problemId = row.original.problemId;
      const problem = problemMap.get(problemId);

      if (!problem) return <div>Problem {problemId}</div>;

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
    cell: ({ row }) => {
      const userId = row.original.userId;
      const user = userMap.get(userId);

      if (!user) return <div>User {userId}</div>;

      return (
        <div>
          <span>{user.username}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: '작성일',
    meta: {
      className: 'w-[30%]',
    },
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;

      if (!createdAt) return '-';

      return <div>{formatDate(createdAt)}</div>;
    },
  },
];
