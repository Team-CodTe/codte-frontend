import { MOCK_DAILY_ASSIGNMENT } from '@/api/mock/mockDailyAssignment';
import { MOCK_SOLUTION_NOTES } from '@/api/mock/mockSolutionNote';
import { type StudyMemberResponse } from '@/api/types/studyDto';
import { type ColumnDef } from '@tanstack/react-table';

import { AssignmentStatusIcon } from '../../AssignmentStatusIcon';

// 헬퍼 함수
const hasSolutionNote = (userId: number, problemId: number) => {
  return MOCK_SOLUTION_NOTES.some(
    (note) => note.user.id === userId && note.problem.id === problemId,
  );
};

export const memberTableColumns: ColumnDef<StudyMemberResponse>[] = [
  {
    accessorKey: 'user.username',
    header: '스터디원',
    meta: { className: 'w-[30%]' },
  },
  // 1. 문제 풀이 칼럼
  {
    id: 'solvedStatus',
    header: '문제 풀이',
    meta: { className: 'w-[35%]' },
    cell: ({ row }) => {
      const member = row.original;

      return (
        <AssignmentStatusIcon
          assignments={MOCK_DAILY_ASSIGNMENT}
          checkIsCompleted={(problemId) => {
            // "문제 풀이"의 완료 조건 로직 주입
            const hasNote = hasSolutionNote(member.user.id, problemId);

            return hasNote || (member.user.id + problemId) % 2 === 0;
          }}
        />
      );
    },
  },
  // 2. 풀이 글 작성 칼럼
  {
    id: 'noteStatus',
    header: '문제 풀이 글 작성',
    meta: { className: 'w-[35%]' },
    cell: ({ row }) => {
      const member = row.original;

      return (
        <AssignmentStatusIcon
          assignments={MOCK_DAILY_ASSIGNMENT}
          checkIsCompleted={(problemId) => {
            // "글 작성"의 완료 조건 로직 주입 (단순 hasNote)
            return hasSolutionNote(member.user.id, problemId);
          }}
        />
      );
    },
  },
];
