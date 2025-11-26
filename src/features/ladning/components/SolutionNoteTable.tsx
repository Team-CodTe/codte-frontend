import { mockSolutionNotes } from '@/api/mock/mockSolutionNote';
import { TierBadge } from '@/components/icons/TierBadge';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { FileCog2Icon, SquareCheckIcon, SquarePenIcon } from 'lucide-react';

export const SolutionNoteTable = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row items-center justify-between">
        <div className="text-muted-foreground ml-4 flex items-center gap-2 text-sm font-semibold">
          <SquareCheckIcon className="size-3.5" />
          <p>문제 풀이 글</p>
        </div>
        <div className="flex gap-2">
          {/** @todo 스터디 회장만 보이도록 변경 */}
          <Button variant="secondary" size="sm">
            <FileCog2Icon />
            <span className="hidden md:inline">템플릿 관리</span>
          </Button>
          <Button variant="secondary" size="sm">
            <SquarePenIcon />
            <span className="hidden md:inline">풀이 글 작성</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>글 번호</TableHead>
              <TableHead>문제 번호</TableHead>
              <TableHead>작성자</TableHead>
              <TableHead>작성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...mockSolutionNotes]
              .sort((a, b) => b.id - a.id)
              .map((note) => (
                <TableRow key={note.id}>
                  <TableCell>{note.id}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <TierBadge level={note.problem.tier} />
                    <a
                      href={note.problem.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline">
                      {note.problem.bojNumber}
                    </a>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span>{note.user.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(note.createdAt).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
