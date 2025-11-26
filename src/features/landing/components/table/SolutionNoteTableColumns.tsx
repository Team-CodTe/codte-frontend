import { type SolutionNoteResponse } from '@/api/types/solutionDto';
import { TierBadge } from '@/components/icons/TierBadge';
import { type ColumnDef } from '@tanstack/react-table';

export const solutionNoteTableColumns: ColumnDef<SolutionNoteResponse>[] = [
  {
    accessorKey: 'id',
    header: '글 번호',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => <div>{row.original.id}</div>,
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
      className: 'w-[40%]',
    },
    cell: ({ row }) => (
      <div>
        {new Date(row.original.createdAt).toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </div>
    ),
  },
];
