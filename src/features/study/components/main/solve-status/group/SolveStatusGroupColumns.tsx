import {
  type AssignmentStatusItem,
  type GroupMemberItem,
  NOTE_STATUS,
  PROBLEM_STATUS,
} from '@/api/solve-status/getSolveStatus/type';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { type ColumnDef } from '@tanstack/react-table';
import { CodeXmlIcon, LibraryIcon } from 'lucide-react';

const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case PROBLEM_STATUS.COMPLETED:
    case NOTE_STATUS.COMPLETED:
      return 'text-success';
    case PROBLEM_STATUS.IN_PROGRESS:
      return 'text-primary';

    default:
      return 'text-muted-foreground';
  }
};

export const solveStatusGroupColumns = (): ColumnDef<GroupMemberItem>[] => [
  {
    accessorKey: 'username',
    header: '이름',
    meta: {
      className: 'w-[15%]',
    },
    cell: ({ row }) => {
      return (
        <span className="block max-w-32 truncate">{row.original.username}</span>
      );
    },
  },
  {
    accessorKey: 'statusSummary',
    header: '풀이 상태 요약',
    meta: {
      className: 'w-[15%]',
    },
    cell: ({ row }) => {
      const { problemStatusSummary, noteStatusSummary, totalCount } =
        row.original;

      const problemCompletedCount = problemStatusSummary.completedCount;
      const noteCompletedCount = noteStatusSummary.completedCount;

      return (
        <div className="flex flex-row items-center gap-3">
          <Badge
            variant="secondary"
            className={cn(
              'transition-colors',
              problemCompletedCount === totalCount &&
                'bg-success/10 border-success/30 text-success',
              problemCompletedCount === 0 && 'text-muted-foreground',
            )}>
            <CodeXmlIcon className="size-3" aria-label="문제 풀이 개수" />
            <span>
              {problemCompletedCount} / {totalCount}
            </span>
          </Badge>

          <Badge
            variant="secondary"
            className={cn(
              'transition-colors',
              noteCompletedCount === totalCount &&
                'bg-success/10 border-success/30 text-success',
              noteCompletedCount === 0 && 'text-muted-foreground',
            )}>
            <LibraryIcon className="size-3" aria-label="풀이 글 작성 개수" />
            <span>
              {noteCompletedCount} / {totalCount}
            </span>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: '풀이 상태',
    meta: {
      className: 'w-[70%]',
    },
    cell: ({ row }) => {
      const assignments = row.original.assignments;

      return (
        <div className="flex flex-row items-center gap-3">
          {assignments.map((assignment: AssignmentStatusItem) => {
            const { problemStatus, noteStatus, problemId, title } = assignment;

            const isProblemCompleted =
              problemStatus === PROBLEM_STATUS.COMPLETED;
            const isNoteCompleted = noteStatus === NOTE_STATUS.COMPLETED;

            const isAllCompleted = isProblemCompleted && isNoteCompleted;
            const isCompletedAny = isProblemCompleted || isNoteCompleted;

            return (
              <Badge
                key={problemId}
                variant="outline"
                className={cn(
                  'transition-colors',
                  isAllCompleted && 'bg-success/10 border-success/30',
                )}>
                <div
                  className={cn(
                    'border-secondary-foreground/20 flex items-center gap-1.5 border-r pr-2 transition-colors',
                    isAllCompleted && 'border-success/30',
                  )}>
                  <CodeXmlIcon
                    className={cn('size-3', getStatusColor(problemStatus))}
                    aria-label={`문제 상태: ${problemStatus}`}
                  />
                  <LibraryIcon
                    className={cn('size-3', getStatusColor(noteStatus))}
                    aria-label={`풀이 글 상태: ${noteStatus}`}
                  />
                </div>
                <span
                  className={cn(
                    'max-w-28 truncate transition-colors',
                    isAllCompleted && 'text-success',
                    !isCompletedAny && 'text-muted-foreground',
                  )}>
                  {title}
                </span>
              </Badge>
            );
          })}
        </div>
      );
    },
  },
];
