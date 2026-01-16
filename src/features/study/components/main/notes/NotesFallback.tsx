'use client';

import { NotesTable } from './NotesTable';
import { notesColumns } from './NotesTableColumns';

export const NotesFallback = () => {
  return <NotesTable data={[]} columns={notesColumns} isLoading={true} />;
};
