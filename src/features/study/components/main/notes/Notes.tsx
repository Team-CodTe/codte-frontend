'use client';

import { useTransition } from 'react';

import { type GetNoteDetailResponse } from '@/api/note/getNoteDetail/type';
import { useNotesQuery } from '@/api/note/getNotes/query';
import { type GetNotesResponse } from '@/api/note/getNotes/type';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { useRouter } from 'next/navigation';

import { NotesTable } from './NotesTable';
import { NOTES_TABLE_COLUMNS } from './NotesTableColumns';

type Props = {
  studyId: number;
  problemId?: number;
  page?: number;
  pageSize?: number;
  initialData: GetNotesResponse;
};

export const Notes = ({
  studyId,
  problemId,
  page,
  pageSize,
  initialData,
}: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const { data } = useNotesQuery(
    {
      studyId,
      problemId,
      page,
      pageSize,
    },
    {
      initialData,
    },
  );

  const onClickRow = (note: GetNoteDetailResponse) => {
    if (isNavigating) {
      return;
    }

    startTransition(() => {
      router.push(
        buildUrlWithParams({
          url: PATH.STUDY.NOTE.DETAIL,
          pathParams: {
            studyId,
            noteId: note.id,
          },
        }),
      );
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <NotesTable
        data={data?.results ?? []}
        columns={NOTES_TABLE_COLUMNS}
        onClickRow={onClickRow}
      />
    </div>
  );
};
