import { useTransition } from 'react';

import { useRemoveNoteMutation } from '@/api/note/deleteRemoveNote/mutation';
import { PATH } from '@/constants/path';
import { useParamInt } from '@/hooks/useParamInt';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { handleApiError } from '@/lib/handleApiError';
import { showToast } from '@/lib/showToast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useRemoveNote = () => {
  const studyId = useParamInt('studyId');
  const noteId = useParamInt('noteId');
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteNote, isPending } = useRemoveNoteMutation(
    noteId,
    {
      onSuccess: async () => {
        queryClient.removeQueries({
          queryKey: ['note', 'detail', noteId],
        });

        await queryClient.invalidateQueries({
          queryKey: ['study', 'notes', studyId],
        });

        await queryClient.invalidateQueries({
          queryKey: ['study', 'notes', 'maximize', studyId],
        });

        startTransition(() => {
          router.replace(
            buildUrlWithParams({
              url: PATH.STUDY.NOTE.LIST,
              pathParams: { studyId },
            }),
          );
        });

        showToast({
          message: '문제 풀이 글이 삭제되었습니다.',
          type: 'success',
        });
      },
      onError: (error) => {
        handleApiError({
          error,
          defaultMessage:
            '문제 풀이 글 삭제에 실패했습니다. 다시 시도해주세요.',
          errorMapping: {
            PERMISSION_DENIED: (message) => ({ message }),
          },
        });
      },
    },
  );

  const handleRemove = () => {
    if (isPending || isNavigating) {
      return;
    }

    mutateDeleteNote();
  };

  return {
    handleRemove,
    isRemoving: isPending || isNavigating,
  };
};
