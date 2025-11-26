'use client';

import { mockDailyAssignment } from '@/api/mock/mockDailyAssignment';
import { mockSolutionNotes } from '@/api/mock/mockSolutionNote';
import { mockStudyMembers } from '@/api/mock/mockStudyMember';
import { type StudyMemberResponse } from '@/api/types/studyDto';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  CheckIcon,
  CircleCheckBigIcon,
  CircleIcon,
  UserRoundCogIcon,
} from 'lucide-react';

import { TableLabel } from './TableLabel';

export const MemberTable = () => {
  const hasSolutionNote = (userId: number, problemId: number) => {
    return mockSolutionNotes.some(
      (note) => note.user.id === userId && note.problem.id === problemId,
    );
  };

  const data = [...mockStudyMembers].sort((a, b) => a.user.id - b.user.id);

  const columns: ColumnDef<StudyMemberResponse>[] = [
    {
      accessorKey: 'user.username',
      header: '스터디원',
    },
    {
      id: 'solvedStatus',
      header: '문제 풀이',
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
                    <CircleCheckBigIcon className="text-success size-4" />
                  ) : (
                    <CircleIcon className="text-muted-foreground size-4" />
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
                    <CircleCheckBigIcon className="text-success size-4" />
                  ) : (
                    <CircleIcon className="text-muted-foreground size-4" />
                  )}
                </div>
              );
            })}
          </div>
        );
      },
    },
  ];

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row items-center justify-between">
        <TableLabel icon={CheckIcon} label="스터디 문제 풀이 상태" />
        {/** @todo 스터디 회장만 보이도록 변경 */}
        <Button variant="secondary" size="sm">
          <UserRoundCogIcon />
          <span className="hidden sm:inline">스터디원 관리</span>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="min-w-24">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-24 text-center">
                  멤버를 찾을 수 없습니다
                </TableCell>
              </TableRow>
            )}
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
