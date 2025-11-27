import { MOCK_SOLUTION_NOTES } from '@/api/mock/mockSolutionNote';
import { type DailyAssignmentResponse } from '@/api/types/problemDto';
import { HintTooltip } from '@/components/common/HintTooltip';
import { TierBadge } from '@/components/common/TierBadge';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { type ColumnDef } from '@tanstack/react-table';

const isSolved = (problemId: number) => {
  return MOCK_SOLUTION_NOTES.some(
    (note) => note.problem.id === problemId && note.user.id === 1,
  );
};

export const problemTableColumns: ColumnDef<DailyAssignmentResponse>[] = [
  {
    accessorKey: 'problem.bojNumber',
    header: '문제 번호',
    meta: {
      className: 'w-[20%]',
    },
    cell: ({ row }) => {
      const { problem } = row.original;
      const isProblemSolved = isSolved(problem.id);

      return (
        <div className="flex items-center gap-2">
          <TierBadge level={problem.tier} />
          <a
            href={problem.link}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'hover:underline',
              isProblemSolved && 'text-muted-foreground',
            )}>
            {problem.bojNumber}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: 'problem.title',
    header: '제목',
    meta: {
      className: 'w-[40%]',
    },
    cell: ({ row }) => {
      const { problem } = row.original;
      const isCustom = row.original.isCustom;
      const isProblemSolved = isSolved(problem.id);

      return (
        <div className="flex flex-row items-center gap-2">
          <a
            href={problem.link}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'hover:underline',
              isProblemSolved && 'text-muted-foreground',
            )}>
            {problem.title}
          </a>
          {isCustom && (
            <HintTooltip content="스터디장이 직접 추가한 문제예요.">
              <Badge variant="secondary">추가됨</Badge>
            </HintTooltip>
          )}
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
    cell: ({ row }) => {
      const { problem } = row.original;
      const isProblemSolved = isSolved(problem.id);

      return (
        <button
          className={cn(
            'cursor-pointer underline-offset-4 hover:underline',
            isProblemSolved &&
              'text-muted-foreground cursor-default no-underline hover:no-underline',
          )}
          disabled={isProblemSolved}>
          {isProblemSolved ? '작성완료' : '작성하기'}
        </button>
      );
    },
  },
];
