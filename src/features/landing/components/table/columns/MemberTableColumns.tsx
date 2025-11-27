import { MOCK_DAILY_ASSIGNMENT } from '@/api/mock/mockDailyAssignment';
import { MOCK_SOLUTION_NOTES } from '@/api/mock/mockSolutionNote';
import { type StudyMemberResponse } from '@/api/types/studyDto';
import { type ColumnDef } from '@tanstack/react-table';

import { AssignmentStatusIcon } from '../../AssignmentStatusIcon';

const TODAY_ASSIGNMENTS = MOCK_DAILY_ASSIGNMENT.filter(
  (assignment) => assignment.assignedDate === '2025-11-28',
);

const hasSolutionNote = (userId: number, problemId: number) => {
  return MOCK_SOLUTION_NOTES.some(
    (note) => note.user.id === userId && note.problem.id === problemId,
  );
};

export const memberTableColumns: ColumnDef<StudyMemberResponse>[] = [
  {
    accessorKey: 'user.username',
    header: '스터디원',
    meta: { className: 'w-[20%]' },
  },
  {
    id: 'solvedStatus',
    header: '문제 풀이',
    meta: { className: 'w-[35%]' },
    cell: ({ row }) => {
      const member = row.original;

      return (
        <AssignmentStatusIcon
          assignments={TODAY_ASSIGNMENTS}
          checkIsCompleted={(problemId) => {
            const hasNote = hasSolutionNote(member.user.id, problemId);

            return hasNote || (member.user.id + problemId) % 2 === 0;
          }}
        />
      );
    },
  },
  {
    id: 'noteStatus',
    header: '문제 풀이 글 작성',
    meta: { className: 'w-[35%]' },
    cell: ({ row }) => {
      const member = row.original;

      return (
        <AssignmentStatusIcon
          assignments={TODAY_ASSIGNMENTS}
          checkIsCompleted={(problemId) => {
            return hasSolutionNote(member.user.id, problemId);
          }}
        />
      );
    },
  },
];
