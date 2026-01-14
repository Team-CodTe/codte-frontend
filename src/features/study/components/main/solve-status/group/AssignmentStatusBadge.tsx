import {
  type AssignmentStatusItem,
  NOTE_STATUS,
  type NoteStatus,
  PROBLEM_STATUS,
  type ProblemStatus,
} from '@/api/solve-status/getSolveStatus/type';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { CodeXmlIcon, LibraryIcon } from 'lucide-react';

const getStatusColor = (status: ProblemStatus | NoteStatus) => {
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

export const AssignmentStatusBadge = ({
  assignment,
}: {
  assignment: AssignmentStatusItem;
}) => {
  const { problemStatus, noteStatus, title } = assignment;

  const isProblemCompleted = problemStatus === PROBLEM_STATUS.COMPLETED;
  const isNoteCompleted = noteStatus === NOTE_STATUS.COMPLETED;
  const isAllCompleted = isProblemCompleted && isNoteCompleted;
  const isCompletedAny = isProblemCompleted || isNoteCompleted;

  return (
    <Badge
      variant="secondary"
      className={cn('transition-colors', isAllCompleted && 'bg-success/10')}>
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
          'block max-w-28 truncate transition-colors',
          isAllCompleted && 'text-success',
          !isCompletedAny && 'text-muted-foreground',
        )}>
        {title}
      </span>
    </Badge>
  );
};
