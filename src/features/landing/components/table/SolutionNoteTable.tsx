'use client';

import { useMemo, useState } from 'react';

import { MOCK_SOLUTION_NOTES } from '@/api/mock/mockSolutionNote';
import { HintTooltip } from '@/components/common/HintTooltip';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useDebounce } from '@/hooks/useDebounce';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  CircleXIcon,
  FileCog2Icon,
  LibraryIcon,
  SquarePenIcon,
} from 'lucide-react';

import { solutionNoteTableColumns } from './columns/SolutionNoteTableColumns';
import { TableLabel } from './TableLabel';

export const SolutionNoteTable = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 200); // 디바운스 200ms 설정

  const handleClearSearch = () => {
    setSearchKeyword('');
  };

  const data = useMemo(() => {
    return [...MOCK_SOLUTION_NOTES]
      .filter((note) => {
        if (!debouncedSearchKeyword) return true;

        const lowerKeyword = debouncedSearchKeyword.toLowerCase();

        return (
          note.problem.bojNumber.toString().includes(lowerKeyword) ||
          note.problem.title.toLowerCase().includes(lowerKeyword) ||
          note.user.username.toLowerCase().includes(lowerKeyword)
        );
      })
      .sort((a, b) => b.id - a.id);
  }, [debouncedSearchKeyword]);

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns: solutionNoteTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex h-full flex-col space-y-3 lg:pb-12">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <TableLabel
          icon={LibraryIcon}
          label="문제 풀이 글"
          tooltipContent="스터디원들이 작성한 문제 풀이 글을 볼 수 있어요."
        />
        <div className="flex gap-2">
          <div className="relative w-full">
            <Input
              id="search"
              type="text"
              inputMode="search"
              placeholder="검색..."
              value={searchKeyword}
              className="h-8 pr-8"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            {searchKeyword && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearSearch}
                className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 h-8 rounded-l-none hover:bg-transparent">
                <CircleXIcon />
                <span className="sr-only">검색어 초기화</span>
              </Button>
            )}
          </div>
          {/** @todo 스터디 회장만 보이도록 변경 */}
          <HintTooltip content="문제 풀이 글에 대한 템플릿을 변경하거나 선택할 수 있어요.">
            <Button variant="secondary" size="sm">
              <FileCog2Icon />
              <span className="hidden sm:inline">템플릿 관리</span>
            </Button>
          </HintTooltip>
          <Button variant="secondary" size="sm">
            <SquarePenIcon />
            <span className="hidden sm:inline">글 작성</span>
          </Button>
        </div>
      </div>

      <div className="relative h-121 min-h-0 overflow-auto rounded-md border lg:max-h-none lg:flex-1">
        <Table noWrapper className="h-full">
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
                ))}
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
              <TableRow className="h-full min-h-11">
                <TableCell
                  colSpan={solutionNoteTableColumns.length}
                  className="text-muted-foreground text-center">
                  글을 찾을 수 없습니다
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
