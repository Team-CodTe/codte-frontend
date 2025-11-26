import { mockDailyAssignment } from '@/api/mock/mockDailyAssignment';
import { mockSolutionNotes } from '@/api/mock/mockSolutionNote';
import { mockStudyMembers } from '@/api/mock/mockStudyMember';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { SquareCheckIcon, UserRoundCogIcon } from 'lucide-react';

export const MemberSolvingStatusTable = () => {
  const hasSolutionNote = (userId: number, problemId: number) => {
    return mockSolutionNotes.some(
      (note) => note.user.id === userId && note.problem.id === problemId,
    );
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row items-center justify-between">
        <div className="text-muted-foreground ml-4 flex items-center gap-2 text-sm font-semibold">
          <SquareCheckIcon className="size-3.5" />
          <p>스터디 문제 풀이 상태</p>
        </div>
        {/** @todo 스터디 회장만 보이도록 변경 */}
        <Button variant="secondary" size="sm">
          <UserRoundCogIcon />
          <span className="hidden md:inline">스터디원 관리</span>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28 min-w-24">멤버</TableHead>
              <TableHead className="w-36 min-w-32">문제 풀이</TableHead>
              <TableHead className="w-36 min-w-32">문제 풀이 글 작성</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockStudyMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="text-center">
                  {member.user.username}
                </TableCell>
                {/** @todo Solved.ac 쿼리로 누가 어떤 문제를 풀고 안풀었는지 체크하는 API 받는걸로 수정 */}
                <TableCell>
                  <div className="flex flex-row items-center justify-center gap-2">
                    {mockDailyAssignment.map((assignment) => {
                      const hasNote = hasSolutionNote(
                        member.user.id,
                        assignment.problem.id,
                      );

                      // ID 합이 짝수라는 규칙에 따라 문제는 풀었지만 글은 작성하지 않은 경우 표현
                      const isSolved =
                        hasNote ||
                        (member.user.id + assignment.problem.id) % 2 === 0;

                      return (
                        <Badge
                          key={assignment.id}
                          variant="outline"
                          className="h-4 w-4 rounded-full p-0">
                          {isSolved && (
                            <Badge
                              variant="default"
                              className="bg-success h-3 w-3 rounded-full p-1"
                            />
                          )}
                        </Badge>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center justify-center gap-2">
                    {mockDailyAssignment.map((assignment) => {
                      const hasNote = hasSolutionNote(
                        member.user.id,
                        assignment.problem.id,
                      );

                      return (
                        <Badge
                          key={assignment.id}
                          variant="outline"
                          className="h-4 w-4 rounded-full p-0">
                          {hasNote && (
                            <Badge
                              variant="default"
                              className="bg-success h-3 w-3 rounded-full p-1"
                            />
                          )}
                        </Badge>
                      );
                    })}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
        <p className="text-right">
          {new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}{' '}
          기준
        </p>
        <button className="cursor-pointer underline-offset-4 hover:underline">
          풀이 상태 강제 갱신
        </button>
      </div>
    </div>
  );
};
