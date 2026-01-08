'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Skeleton } from '@/components/ui/Skeleton';
import { Spinner } from '@/components/ui/Spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { type TablePropsWithInfiniteScroll } from '@/types/tableProps';
import {
  flexRender,
  getCoreRowModel,
  type Row,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

const TABLE_ROW_HEIGHT = 44;

export const NotesMaximizeTable = <TData, TValue>({
  data,
  columns,
  isLoading = false,
  isFiltered = false,
  onClickRow,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  scrollRef,
}: TablePropsWithInfiniteScroll<TData, TValue>) => {
  const [tableContainer, setTableContainer] = useState<HTMLDivElement | null>(
    null,
  );

  const isFetchingRef = useRef(false);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    root: tableContainer,
    skip: !tableContainer,
  });

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  useEffect(() => {
    isFetchingRef.current = isFetchingNextPage ?? false;
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (inView && !isFetchingRef.current && hasNextPage) {
      isFetchingRef.current = true;
      fetchNextPage?.();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => TABLE_ROW_HEIGHT,
    getScrollElement: () => tableContainer,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
    useFlushSync: false,
  });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      setTableContainer(node); // 내부 State 업데이트 -> 리렌더링 발생
      scrollRef?.(node); // 부모(useScrollRestoration)의 Ref 실행
    },
    [scrollRef],
  );

  if (isLoading) {
    return (
      <div className="h-full min-h-0 overflow-auto">
        <Table noWrapper>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`min-w-24 pl-0 ${(header.column.columnDef.meta as { className?: string })?.className ?? ''}`}>
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
            {Array.from({ length: isFiltered ? 1 : 30 }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((_, cellIndex) => (
                  <TableCell key={cellIndex} className="pl-0">
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={setRefs}
        className="relative max-h-[calc(100dvh-14.5rem)] overflow-auto">
        <Table noWrapper style={{ display: 'grid' }}>
          <TableHeader
            style={{
              display: 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
            className="bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                style={{ display: 'flex', width: '100%' }}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      display: 'flex',
                      width: header.getSize(),
                      flex: '1 1 0%',
                    }}
                    className={`flex min-w-24 items-center pl-0 ${(header.column.columnDef.meta as { className?: string })?.className ?? ''}`}>
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
          <TableBody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}>
            {rows.length === 0 ? (
              <TableRow className="h-full min-h-11">
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground flex h-full items-center justify-center">
                  {isFiltered
                    ? '검색 결과가 없습니다'
                    : '아직 작성된 글이 없습니다'}
                </TableCell>
              </TableRow>
            ) : (
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<TData>;

                return (
                  <TableRow
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => onClickRow?.(row.original)}
                    style={{
                      display: 'flex',
                      position: 'absolute',
                      transform: `translateY(${virtualRow.start}px)`,
                      width: '100%',
                    }}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: cell.column.getSize(),
                          flex: '1 1 0%',
                        }}
                        className="pl-0">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <div
          ref={loadMoreRef}
          className="flex h-11 w-full items-center justify-center">
          {isFetchingNextPage && <Spinner className="text-muted-foreground" />}
        </div>
      </div>
    </div>
  );
};
