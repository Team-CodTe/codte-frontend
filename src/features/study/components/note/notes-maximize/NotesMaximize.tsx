'use client';

import { useTransition } from 'react';

import { type GetNoteDetailResponse } from '@/api/note/getNoteDetail/type';
import { useNotesInfiniteQuery } from '@/api/note/getNotes/query';
import { Separator } from '@/components/ui/Separator';
import { PATH } from '@/constants/path';
import { useNotesFilterParams } from '@/features/study/hooks/useNotesFilterParams';
import { useDebounce } from '@/hooks/useDebounce';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { type StudyRole } from '@/types/studyRole';
import { useRouter } from 'next/navigation';

import { NOTES_TABLE_COLUMNS } from '../../main/notes/NotesTableColumns';
import { NotesMaximizeTable } from './NotesMaximizeTable';
import { NotesMaximizeTableFilter } from './NotesMaximizeTableFilter';
import { NotesMaximizeTableHeader } from './NotesMaximizeTableHeader';

type Props = {
  studyId: number;
  role: StudyRole;
  problemId?: number;
  pageSize?: number;
};

export const NotesMaximize = ({
  studyId,
  role,
  problemId,
  pageSize,
}: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const { keyword, setKeyword, dateFilter, handleFiltersReset } =
    useNotesFilterParams();

  const { formattedAssignedDate, formattedUpdatedDate } = dateFilter;
  const debouncedQuery = useDebounce(keyword, 300);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useNotesInfiniteQuery({
      studyId,
      problemId,
      pageSize,
      assignedDate: formattedAssignedDate,
      updatedDate: formattedUpdatedDate,
      query: debouncedQuery,
    });

  const { scrollRef, scrollElement } = useScrollRestoration(
    `study-${studyId}-notes-maximize`,
    data,
    { useCustomElement: true },
  );

  const isFiltered =
    !!debouncedQuery || !!formattedAssignedDate || !!formattedUpdatedDate;

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    scrollElement?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFiltersResetWithScroll = () => {
    handleFiltersReset();
    scrollElement?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const moveToNoteDetail = (note: GetNoteDetailResponse) => {
    if (isNavigating) return;

    startTransition(() => {
      router.push(
        buildUrlWithParams({
          url: PATH.STUDY.NOTE.DETAIL,
          pathParams: { studyId, noteId: note.id },
        }),
      );
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-col gap-3">
        <NotesMaximizeTableHeader studyId={studyId} role={role} />
        <Separator />
        <NotesMaximizeTableFilter
          totalCount={data?.pages[0]?.count ?? 0}
          keyword={keyword}
          setKeyword={handleKeywordChange}
          dateFilter={dateFilter}
          onResetFilters={handleFiltersResetWithScroll}
          isFiltered={isFiltered}
        />
      </div>
      <div className="min-h-0 flex-1">
        <NotesMaximizeTable
          data={data?.pages.flatMap((page) => page.results) ?? []}
          columns={NOTES_TABLE_COLUMNS}
          isLoading={isLoading}
          isFiltered={isFiltered}
          onClickRow={moveToNoteDetail}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          scrollRef={scrollRef}
        />
      </div>
    </div>
  );
};
