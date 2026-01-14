'use client';

import { Separator } from '@/components/ui/Separator';
import { Skeleton } from '@/components/ui/Skeleton';

import { notesColumns } from '../../main/notes/NotesTableColumns';
import { NotesMaximizeTable } from './NotesMaximizeTable';

export const NotesMaximizeFallback = () => {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex h-9 flex-row items-center justify-between gap-3">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-9 w-20" />
        </div>

        <Separator className="text-accent" />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="xs:order-2 order-1 ml-auto flex items-center gap-2">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-20" />
          </div>

          <div className="xs:order-3 xs:w-80 relative order-2 ml-auto w-full">
            <Skeleton className="h-9 w-full" />
          </div>

          <div className="xs:order-1 xs:text-start order-3 min-w-fit flex-1 text-end">
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>

      <NotesMaximizeTable data={[]} columns={notesColumns} isLoading={true} />
    </div>
  );
};
