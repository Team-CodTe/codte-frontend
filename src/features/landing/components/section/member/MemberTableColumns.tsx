import { MOCK_DAILY_ASSIGNMENT } from '@/api/mock/mockDailyAssignment';
import { MOCK_SOLUTION_NOTES } from '@/api/mock/mockSolutionNote';
import { MOCK_USERS } from '@/api/mock/mockUser';
import { type StudyMemberResponse } from '@/api/types/studyDto';
import { type ColumnDef } from '@tanstack/react-table';

import { AssignmentStatusIcon } from '../daily-assignment/AssignmentStatusIcon';

const TODAY_ASSIGNMENTS = MOCK_DAILY_ASSIGNMENT.filter(
  (assignment) => assignment.assignedDate === '2025-11-28',
);

const hasSolutionNote = (userId: number, problemId: number) => {
  return MOCK_SOLUTION_NOTES.some(
    (note) => note.userId === userId && note.problemId === problemId,
  );
};

export const memberTableColumns: ColumnDef<StudyMemberResponse>[] = [
  {
    accessorKey: 'userId',
    header: '스터디원',
    meta: { className: 'w-[20%]' },
    cell: ({ row }) => {
      const userId = row.original.userId;
      const user = MOCK_USERS.find((u) => u.id === userId);

      return user?.username || `User ${userId}`;
    },
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
            const hasNote = hasSolutionNote(member.userId, problemId);

            return hasNote || (member.userId + problemId) % 2 === 0;
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
            return hasSolutionNote(member.userId, problemId);
          }}
        />
      );
    },
  },
];
