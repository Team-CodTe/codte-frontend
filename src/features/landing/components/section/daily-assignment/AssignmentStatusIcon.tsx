import { MOCK_PROBLEMS } from '@/api/mock/mockProblem';
import { type DailyAssignmentResponse } from '@/api/types/problemDto';
import { HintTooltip } from '@/components/common/HintTooltip';
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
        const isCompleted = checkIsCompleted(assignment.problemId);
        const problem = MOCK_PROBLEMS.find(
          (problem) => problem.id === assignment.problemId,
        );

        return (
          <div key={assignment.id}>
            <HintTooltip content={`${problem?.bojNumber} : ${problem?.title}`}>
              {isCompleted ? (
                <CircleCheckBigIcon className="text-success size-4" />
              ) : (
                <CircleIcon className="text-muted-foreground size-4" />
              )}
            </HintTooltip>
          </div>
        );
      })}
    </div>
  );
};
