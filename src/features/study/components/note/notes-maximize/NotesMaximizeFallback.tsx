'use client';

import { Skeleton } from '@/components/ui/Skeleton';

import { NotesMaximizeTable } from './NotesMaximizeTable';
import { NOTES_MAXIMIZE_TABLE_COLUMNS } from './NotesMaximizeTableColumns';

export const NotesMaximizeFallback = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-end gap-3 md:flex-row md:items-center md:justify-between">
        <div className="order-last flex w-full flex-col items-end justify-end gap-2 sm:flex-row sm:items-center sm:justify-start md:order-first">
          <div className="relative order-last max-sm:w-full sm:order-first">
            <Skeleton className="h-9 w-full min-w-56" />
          </div>

          <div className="order-first flex items-center gap-2 sm:order-last">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        <div className="order-first flex gap-2 md:order-last">
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <NotesMaximizeTable
        data={[]}
        columns={NOTES_MAXIMIZE_TABLE_COLUMNS}
        isLoading={true}
      />

      <div className="flex w-full flex-col items-center justify-center gap-3 px-2 lg:flex-row lg:justify-between lg:gap-6">
        <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-1 sm:flex-row">
          <Skeleton className="h-5 w-32" />

          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>

        <div>
          <Skeleton className="h-9 w-64" />
        </div>
      </div>
    </div>
  );
};
