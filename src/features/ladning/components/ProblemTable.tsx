'use client';

import { mockDailyAssignment } from '@/api/mock/mockDailyAssignment';
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
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CodeXmlIcon, KeyboardIcon, PlusIcon } from 'lucide-react';

import { ProblemTableColumns } from './ProblemTableColumns';
import { TableLabel } from './TableLabel';

export const ProblemTable = () => {
  const data = [...mockDailyAssignment].sort(
    (a, b) => a.problem.bojNumber - b.problem.bojNumber,
  );

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns: ProblemTableColumns,
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
                    <TableHead
                      key={header.id}
                      className={`min-w-24 ${(header.column.columnDef.meta as { className?: string })?.className ?? ''}`}>
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
                  colSpan={ProblemTableColumns.length}
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
