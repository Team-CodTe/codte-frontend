import { useSyncExternalStore } from 'react';

import { useNoteDetailQuery } from '@/api/note/getNoteDetail/query';
import { useParamInt } from '@/hooks/useParamInt';

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const useCurrentNoteDetail = () => {
  const noteId = useParamInt('noteId');

  // Hydration 안전: 서버에서는 false, 클라이언트에서는 true 반환
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const { data: note, isLoading: isQueryLoading } = useNoteDetailQuery(noteId);

  // Hydration 안전: 마운트 전에는 항상 로딩 상태로 처리
  const isLoading = !isMounted || isQueryLoading;

  return {
    noteId,
    note: isMounted ? note : undefined,
    isLoading,
  };
};
