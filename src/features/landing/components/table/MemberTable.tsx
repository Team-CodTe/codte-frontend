'use client';

import { MOCK_STUDY_MEMBERS } from '@/api/mock/mockStudyMember';
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
import { CheckIcon, UserRoundCogIcon } from 'lucide-react';

import { memberTableColumns } from './MemberTableColumns';
import { TableLabel } from './TableLabel';

export const MemberTable = () => {
  const data = [...MOCK_STUDY_MEMBERS].sort((a, b) => a.user.id - b.user.id);

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns: memberTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-row items-center justify-between">
        <TableLabel
          icon={CheckIcon}
          label="스터디 문제 풀이 상태"
          tooltipContent="스터디원들의 문제 풀이 현황과 풀이 글 작성 현황을 한 눈에 볼 수 있어요"
        />
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
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="cursor-pointer underline-offset-4 hover:underline">
              풀이 상태 강제 갱신
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>문제를 풀어도 풀이 상태가 갱신되지 않을 때 사용해요</p>
            <p>30분에 한 번만 강제 갱신할 수 있어요</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
