import { type DailyAssignmentResponse } from '@/api/types/problemDto';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { CircleCheckBigIcon, CircleIcon } from 'lucide-react';

type Props = {
  assignments: DailyAssignmentResponse[];
  checkIsCompleted: (assignmentId: number) => boolean;
};

export const AssignmentStatusIcon = ({
  assignments,
  checkIsCompleted,
}: Props) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {assignments.map((assignment) => {
        const isCompleted = checkIsCompleted(assignment.problem.id);

        return (
          <div key={assignment.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                {isCompleted ? (
                  <CircleCheckBigIcon className="text-success size-4" />
                ) : (
                  <CircleIcon className="text-muted-foreground size-4" />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{assignment.problem.title}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};
