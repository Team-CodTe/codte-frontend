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
  pageSize?: number;
  initialData: GetNotesResponse;
};

export const Notes = ({ studyId, problemId, pageSize, initialData }: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const { data } = useNotesQuery(
    {
      studyId,
      problemId,
      pageSize,
    },
    {
      initialData,
    },
  );

  const handleRowClick = (note: GetNoteDetailResponse) => {
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
        onClickRow={handleRowClick}
      />

      <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
        <span>최근 등록된 30개의 풀이 글만 표시됩니다.</span>
        <span>전체 풀이 글 개수: {data?.count?.toLocaleString()}개</span>
      </div>
    </div>
  );
};
