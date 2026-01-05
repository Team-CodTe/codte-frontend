'use client';

import { Separator } from '@/components/ui/Separator';
import { Skeleton } from '@/components/ui/Skeleton';

import { NOTES_TABLE_COLUMNS } from '../../main/notes/NotesTableColumns';
import { NotesMaximizeTable } from './NotesMaximizeTable';

export const NotesMaximizeFallback = () => {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex h-9 flex-row items-center justify-between gap-3">
          <Skeleton className="h-8 w-28" />
        </div>

        <Separator className="text-accent" />

        <div className="mt-3 flex flex-row items-center justify-between gap-4">
          <Skeleton className="h-6 w-20" />

          <div className="flex gap-2">
            <Skeleton className="size-9 h-9 sm:w-24" />
            <Skeleton className="size-9 h-9 sm:w-20.5" />
            <Skeleton className="h-9 w-50" />
          </div>
        </div>
      </div>

      <NotesMaximizeTable
        data={[]}
        columns={NOTES_TABLE_COLUMNS}
        isLoading={true}
      />
    </div>
  );
};
