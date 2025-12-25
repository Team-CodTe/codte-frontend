'use client';

import { NotesTable } from './NotesTable';
import { NOTES_TABLE_COLUMNS } from './NotesTableColumns';

export const NotesFallback = () => {
  return (
    <NotesTable data={[]} columns={NOTES_TABLE_COLUMNS} isLoading={true} />
  );
};
