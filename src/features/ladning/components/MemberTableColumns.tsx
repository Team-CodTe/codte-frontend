import { mockDailyAssignment } from '@/api/mock/mockDailyAssignment';
import { mockSolutionNotes } from '@/api/mock/mockSolutionNote';
import { type StudyMemberResponse } from '@/api/types/studyDto';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { type ColumnDef } from '@tanstack/react-table';
import { CircleCheckBigIcon, CircleIcon } from 'lucide-react';

const hasSolutionNote = (userId: number, problemId: number) => {
  return mockSolutionNotes.some(
    (note) => note.user.id === userId && note.problem.id === problemId,
  );
};

export const MemberTableColumns: ColumnDef<StudyMemberResponse>[] = [
  {
    accessorKey: 'user.username',
    header: '스터디원',
    meta: {
      className: 'w-[30%]',
    },
  },
  {
    id: 'solvedStatus',
    header: '문제 풀이',
    meta: {
      className: 'w-[35%]',
    },
    cell: ({ row }) => {
      const member = row.original;

      return (
        <div className="flex flex-row items-center gap-2">
          {mockDailyAssignment.map((assignment) => {
            const hasNote = hasSolutionNote(
              member.user.id,
              assignment.problem.id,
            );

            // ID 합이 짝수라는 규칙에 따라 문제는 풀었지만 글은 작성하지 않은 경우 표현
            const isSolved =
              hasNote || (member.user.id + assignment.problem.id) % 2 === 0;

            return (
              <div key={`solved-${assignment.id}`}>
                {isSolved ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleCheckBigIcon className="text-success size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{assignment.problem.title}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleIcon className="text-muted-foreground size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{assignment.problem.title}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    id: 'noteStatus',
    header: '문제 풀이 글 작성',
    meta: {
      className: 'w-[35%]',
    },
    cell: ({ row }) => {
      const member = row.original;

      return (
        <div className="flex flex-row items-center gap-2">
          {mockDailyAssignment.map((assignment) => {
            const hasNote = hasSolutionNote(
              member.user.id,
              assignment.problem.id,
            );

            return (
              <div key={`note-${assignment.id}`}>
                {hasNote ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleCheckBigIcon className="text-success size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{assignment.problem.title}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleIcon className="text-muted-foreground size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{assignment.problem.title}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            );
          })}
        </div>
      );
    },
  },
];
