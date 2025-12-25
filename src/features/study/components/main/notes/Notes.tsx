'use client';

import { useNotesQuery } from '@/api/note/getNotes/query';
import { type GetNotesResponse } from '@/api/note/getNotes/type';

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

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <NotesTable data={data?.results ?? []} columns={NOTES_TABLE_COLUMNS} />
    </div>
  );
};
