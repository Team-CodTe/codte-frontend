'use client';

import { useDailyAssignmentsQuery } from '@/api/assignment/getDailyAssignments/query';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { SquarePenIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  studyId: number;
};

export const SelectAssignmentDropdownButton = ({ studyId }: Props) => {
  const router = useRouter();
  const { data } = useDailyAssignmentsQuery(studyId);

  const assignments = data?.assignments ?? [];

  const handleSelectProblem = (selectedProblemId: number) => {
    router.push(
      buildUrlWithParams({
        url: PATH.STUDY.NOTES.WRITE,
        pathParams: { studyId },
        queryParams: { problemId: selectedProblemId },
      }),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon-responsive">
          <SquarePenIcon />
          <span className="hidden sm:inline">글 작성</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {assignments.length > 0 ? (
          assignments.map((assignment) => {
            return (
              <DropdownMenuItem
                key={assignment.id}
                onClick={() => handleSelectProblem(assignment.problemId)}>
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
