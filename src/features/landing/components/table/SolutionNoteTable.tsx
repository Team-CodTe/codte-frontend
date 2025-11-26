'use client';

import { useMemo, useState } from 'react';

import { MOCK_SOLUTION_NOTES } from '@/api/mock/mockSolutionNote';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/Pagination';
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
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleXIcon,
  FileCog2Icon,
  LibraryIcon,
  SquarePenIcon,
} from 'lucide-react';

import { TableLabel } from './TableLabel';
import { solutionNoteTableColumns } from './SolutionNoteTableColumns';

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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <TableLabel
          icon={LibraryIcon}
          label="문제 풀이 글"
          tooltipContent="스터디원들이 작성한 문제 풀이 글을 볼 수 있어요"
        />
        <div className="flex gap-2">
          <div className="relative w-full">
            <Input
              id="search"
              type="text"
              inputMode="search"
              placeholder="검색..."
              value={searchKeyword}
              className="pr-8"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            {searchKeyword && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearSearch}
                className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent">
                <CircleXIcon />
                <span className="sr-only">검색어 초기화</span>
              </Button>
            )}
          </div>
          {/** @todo 스터디 회장만 보이도록 변경 */}
          <Button variant="secondary" size="sm">
            <FileCog2Icon />
            <span className="hidden sm:inline">템플릿 관리</span>
          </Button>
          <Button variant="secondary" size="sm">
            <SquarePenIcon />
            <span className="hidden sm:inline">글 작성</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
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
              <TableRow>
                <TableCell
                  colSpan={solutionNoteTableColumns.length}
                  className="text-muted-foreground h-110 text-center">
                  글을 찾을 수 없습니다
                </TableCell>
              </TableRow>
            )}
            {/* 데이터가 10개 미만일 때 빈 행 추가 */}
            {table.getRowModel().rows.length > 0 &&
              Array.from({ length: 10 - table.getRowModel().rows.length }).map(
                (_, index) => (
                  <TableRow key={`empty-${index}`}>
                    <TableCell
                      colSpan={solutionNoteTableColumns.length}
                      className="h-11"
                    />
                  </TableRow>
                ),
              )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p
            className="text-muted-foreground text-sm whitespace-nowrap"
            aria-live="polite">
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0,
                ),
                table.getRowCount(),
              )}
            </span>{' '}
            of{' '}
            <span className="text-foreground">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page">
                  <ChevronFirstIcon aria-hidden="true" />
                </Button>
              </PaginationItem>

              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page">
                  <ChevronLeftIcon aria-hidden="true" />
                </Button>
              </PaginationItem>

              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page">
                  <ChevronRightIcon aria-hidden="true" />
                </Button>
              </PaginationItem>

              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page">
                  <ChevronLastIcon aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
