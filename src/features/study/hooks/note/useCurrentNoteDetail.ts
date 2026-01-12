import { useNoteDetailQuery } from '@/api/note/getNoteDetail/query';
import { useParamInt } from '@/hooks/useParamInt';

export const useCurrentNoteDetail = () => {
  const noteId = useParamInt('noteId');

  const { data: note, isLoading } = useNoteDetailQuery(noteId, {
    enabled: !!noteId,
  });

  return {
    noteId,
    note,
    isLoading,
  };
};
