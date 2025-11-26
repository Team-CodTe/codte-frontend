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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
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
        <TableLabel
          icon={CodeXmlIcon}
          label="오늘의 추천 문제"
          tooltipContent="스터디원들의 백준 ID를 이용해서 쿼리에 맞는 문제를 매일 추천해줘요"
        />
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
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="cursor-pointer underline-offset-4 hover:underline">
              추천 문제 강제 갱신
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              새로운 스터디원이 들어와서 새로운 문제를 추천받아야 할 때 사용해요
            </p>
            <p>30분에 한 번만 강제 갱신할 수 있어요</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
