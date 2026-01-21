import { useSyncExternalStore } from 'react';

import { useNoteDetailQuery } from '@/api/note/getNoteDetail/query';
import { useParamInt } from '@/hooks/useParamInt';

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const useCurrentNoteDetail = () => {
  const noteId = useParamInt('noteId');

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const { data: note, isLoading: isQueryLoading } = useNoteDetailQuery(noteId, {
    enabled: !!noteId,
  });

  const isLoading = !isMounted || isQueryLoading;

  return {
    noteId,
    note: isMounted ? note : undefined,
    isLoading,
  };
};
