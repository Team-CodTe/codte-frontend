'use client';

import { useTransition } from 'react';

import { type GetNoteDetailResponse } from '@/api/note/getNoteDetail/type';
import { useNotesPaginatedQuery } from '@/api/note/getNotes/query';
import { PATH } from '@/constants/path';
import { DATE_FORMAT } from '@/features/study/constants/notesFilterOptions';
import { useNotesFilterParams } from '@/features/study/hooks/note/useNotesFilterParams';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { type StudyRole } from '@/types/studyRole';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { NotesMaximizeTable } from './NotesMaximizeTable';
import { NOTES_MAXIMIZE_TABLE_COLUMNS } from './NotesMaximizeTableColumns';
import { NotesMaximizeTableFilter } from './NotesMaximizeTableFilter';
import { NotesPagination } from './NotesPagination';
import { PageSizeSelect } from './PageSizeSelect';

type Props = {
  studyId: number;
  role: StudyRole;
  problemId?: number;
};

export const NotesMaximize = ({ studyId, role, problemId }: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const {
    keyword,
    setKeyword,
    page,
    handlePageChange,
    pageSize,
    handlePageSizeChange,
    dateFilter,
    handleFiltersReset,
    isFiltered,
  } = useNotesFilterParams();

  const assignedDateStr = dateFilter.assigned.date
    ? format(dateFilter.assigned.date, DATE_FORMAT)
    : undefined;

  const createdDateStr = dateFilter.created.date
    ? format(dateFilter.created.date, DATE_FORMAT)
    : undefined;

  const { data, isLoading, isPlaceholderData } = useNotesPaginatedQuery({
    studyId,
    problemId,
    page,
    pageSize,
    assignedDate: assignedDateStr,
    createdDate: createdDateStr,
    query: keyword,
  });

  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const moveToNoteDetail = (note: GetNoteDetailResponse) => {
    if (isNavigating) return;

    startTransition(() => {
      router.push(
        buildUrlWithParams({
          url: PATH.STUDY.NOTES.DETAIL,
          pathParams: { studyId, noteId: note.id },
        }),
      );
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <NotesMaximizeTableFilter
        studyId={studyId}
        role={role}
        keyword={keyword}
        setKeyword={setKeyword}
        dateFilter={dateFilter}
        onResetFilters={handleFiltersReset}
        isFiltered={isFiltered}
      />

      <div className={isPlaceholderData ? 'opacity-50' : ''}>
        <NotesMaximizeTable
          data={data?.results ?? []}
          columns={NOTES_MAXIMIZE_TABLE_COLUMNS}
          isLoading={isLoading}
          isFiltered={isFiltered}
          onClickRow={moveToNoteDetail}
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-2 px-2 lg:flex-row lg:justify-between lg:gap-6">
        <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-1 sm:flex-row">
          <span className="text-muted-foreground text-sm">
            {totalCount.toLocaleString()}개의 풀이 글 조회됨
          </span>

          <PageSizeSelect
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>

        <div>
          <NotesPagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
