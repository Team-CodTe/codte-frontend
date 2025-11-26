'use client';

import { mockDailyAssignment } from '@/api/mock/mockDailyAssignment';
import { mockSolutionNotes } from '@/api/mock/mockSolutionNote';
import { type DailyAssignmentResponse } from '@/api/types/problemDto';
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
import { cn } from '@/lib/utils';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CodeXmlIcon, KeyboardIcon, PlusIcon } from 'lucide-react';

import { TableLabel } from './TableLabel';

export const ProblemTable = () => {
  const isSolved = (problemId: number) => {
    return mockSolutionNotes.some(
      (note) => note.problem.id === problemId && note.user.id === 1,
    );
  };

  const data = [...mockDailyAssignment].sort(
    (a, b) => a.problem.bojNumber - b.problem.bojNumber,
  );

  const columns: ColumnDef<DailyAssignmentResponse>[] = [
    {
      accessorKey: 'problem.bojNumber',
      header: '문제 번호',
      cell: ({ row }) => {
        const { problem } = row.original;
        const isProblemSolved = isSolved(problem.id);

        return (
          <div className="flex items-center gap-2">
            <TierBadge level={problem.tier} />
            <a
              href={problem.link}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'hover:underline',
                isProblemSolved && 'text-muted-foreground',
              )}>
              {problem.bojNumber}
            </a>
          </div>
        );
      },
    },
    {
      accessorKey: 'problem.title',
      header: '제목',
      cell: ({ row }) => {
        const { problem } = row.original;
        const isProblemSolved = isSolved(problem.id);

        return (
          <a
            href={problem.link}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'hover:underline',
              isProblemSolved && 'text-muted-foreground',
            )}>
            {problem.title}
          </a>
        );
      },
    },
    {
      id: 'actions',
      header: '문제 풀이 글',
      cell: ({ row }) => {
        const { problem } = row.original;
        const isProblemSolved = isSolved(problem.id);

        return (
          <button
            className={cn(
              'cursor-pointer underline-offset-4 hover:underline',
              isProblemSolved &&
                'text-muted-foreground cursor-default no-underline hover:no-underline',
            )}
            disabled={isProblemSolved}>
            {isProblemSolved ? '작성완료' : '작성하기'}
          </button>
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
        <TableLabel icon={CodeXmlIcon} label="오늘의 추천 문제" />
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <PlusIcon />
            <span className="hidden sm:inline">문제 수동 추가</span>
          </Button>
          <Button variant="secondary" size="sm">
            <KeyboardIcon />
            <span className="hidden sm:inline">추천 쿼리 변경</span>
          </Button>
        </div>
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
                  문제를 찾을 수 없습니다
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
        <p className="text-right">
          {new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          00:00 기준
        </p>
        <button className="cursor-pointer underline-offset-4 hover:underline">
          추천 문제 강제 갱신
        </button>
      </div>
    </div>
  );
};
