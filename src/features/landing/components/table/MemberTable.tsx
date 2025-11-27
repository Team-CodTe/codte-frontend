'use client';

import { MOCK_STUDY_MEMBERS } from '@/api/mock/mockStudyMember';
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
import { CheckIcon, UserRoundCogIcon } from 'lucide-react';

import { memberTableColumns } from './columns/MemberTableColumns';
import { TableLabel } from './TableLabel';

export const MemberTable = () => {
  const data = MOCK_STUDY_MEMBERS;

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns: memberTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex min-h-0 flex-col space-y-3 md:flex-1">
      <div className="flex flex-row items-center justify-between">
        <TableLabel
          icon={CheckIcon}
          label="스터디 문제 풀이 상태"
          tooltipContent="스터디원들의 문제 풀이 현황과 풀이 글 작성 현황을 한 눈에 볼 수 있어요."
        />
        {/** @todo 스터디 회장만 보이도록 변경 */}
        <Button variant="secondary" size="sm">
          <UserRoundCogIcon />
          <span className="hidden sm:inline">스터디원 관리</span>
        </Button>
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
                  colSpan={memberTableColumns.length}
                  className="text-muted-foreground h-24 text-center">
                  스터디원을 찾을 수 없습니다
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
        {/** 여기서는 현재 시각을 보여주는 것이지만, 실제 대시보드에서는 업데이트된 시간을 보여줘야 함 */}
        <span className="text-right" suppressHydrationWarning>
          {new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}{' '}
          기준
        </span>
        <HintTooltip content="문제를 풀어도 풀이 상태가 갱신되지 않을 때 사용해요. 30분에 한 번만 강제 갱신할 수 있어요.">
          <button
            onClick={() => console.log('강제 갱신 버튼 클릭')}
            className="cursor-pointer underline-offset-4 hover:underline">
            풀이 상태 강제 갱신
          </button>
        </HintTooltip>
      </div>
    </div>
  );
};
