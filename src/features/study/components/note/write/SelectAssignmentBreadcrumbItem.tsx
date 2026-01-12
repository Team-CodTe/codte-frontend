'use client';

import { useDailyAssignmentsQuery } from '@/api/assignment/getDailyAssignments/query';
import { BreadcrumbPage } from '@/components/ui/Breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { ChevronDown } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';

type Props = {
  studyId: number;
};

export const SelectAssignmentBreadcrumbItem = ({ studyId }: Props) => {
  const [problemId, setProblemId] = useQueryState('problemId', parseAsInteger);

  const { data } = useDailyAssignmentsQuery(studyId);

  const assignments = data?.assignments ?? [];

  const selectedAssignment = problemId
    ? assignments.find((assignment) => assignment.problemId === problemId)
    : null;

  const displayLabel = selectedAssignment?.title ?? '문제 선택';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
        <BreadcrumbPage className="block truncate">
          {displayLabel}
        </BreadcrumbPage>
        <ChevronDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {assignments.length > 0 ? (
          assignments.map((assignment) => {
            const problemId = assignment.problemId;

            return (
              <DropdownMenuItem
                key={assignment.id}
                onClick={() => setProblemId(problemId)}>
                {assignment.title}
              </DropdownMenuItem>
            );
          })
        ) : (
          <DropdownMenuItem>오늘의 추천 문제가 없습니다</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
