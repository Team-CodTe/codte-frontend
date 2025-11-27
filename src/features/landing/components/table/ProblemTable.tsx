'use client';

import { MOCK_DAILY_ASSIGNMENT } from '@/api/mock/mockDailyAssignment';
import { HintTooltip } from '@/components/common/HintTooltip';
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

import { problemTableColumns } from './columns/ProblemTableColumns';
import { TableLabel } from './TableLabel';

export const ProblemTable = () => {
  const data = MOCK_DAILY_ASSIGNMENT;

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns: problemTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex min-h-0 flex-col space-y-3 md:flex-1">
      <div className="flex flex-row items-center justify-between">
        <TableLabel
          icon={CodeXmlIcon}
          label="오늘의 추천 문제"
          tooltipContent="스터디원들의 백준 ID를 이용해서 쿼리에 맞는 문제를 매일 추천해줘요."
        />
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <PlusIcon />
            <span className="hidden sm:inline">문제 수동 추가</span>
          </Button>
          <HintTooltip content="문제 추천 쿼리를 변경할 때 사용해요. 변경된 쿼리는 다음날 자동으로 반영되거나 강제 갱신을 통해 반영할 수 있어요.">
            <Button variant="secondary" size="sm">
              <KeyboardIcon />
              <span className="hidden sm:inline">추천 쿼리 변경</span>
            </Button>
          </HintTooltip>
        </div>
      </div>

      <div className="relative max-h-66 min-h-0 overflow-auto rounded-md border lg:max-h-none lg:flex-1">
        <Table noWrapper>
          <TableHeader className="bg-muted sticky top-0 z-10">
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
                  colSpan={problemTableColumns.length}
                  className="text-muted-foreground h-24 text-center">
                  문제를 찾을 수 없습니다
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
        {/** 여기서는 현재 시각을 보여주는 것이지만, 실제 대시보드에서는 업데이트된 시간을 보여줘야 함 */}
        <span className="text-right" suppressHydrationWarning>
          {new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          00:00 기준
        </span>
        <HintTooltip content="새로운 스터디원이 들어와서 새로운 문제를 추천받아야 할 때 사용해요. 30분에 한 번만 강제 갱신할 수 있어요.">
          <button
            onClick={() => console.log('강제 갱신 버튼 클릭')}
            className="cursor-pointer underline-offset-4 hover:underline">
            추천 문제 강제 갱신
          </button>
        </HintTooltip>
      </div>
    </div>
  );
};
