'use client';

import { notesColumns } from './NotesColumns';
import { NotesTable } from './NotesTable';

export const NotesFallback = () => {
  return <NotesTable data={[]} columns={notesColumns} isLoading={true} />;
};
