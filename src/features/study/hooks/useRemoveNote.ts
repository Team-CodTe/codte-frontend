import { useTransition } from 'react';

import { useRemoveNoteMutation } from '@/api/note/deleteRemoveNote/mutation';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type Props = {
  studyId: number;
  noteId: number;
};

export const useRemoveNote = ({ studyId, noteId }: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteNote, isPending: isRemoving } =
    useRemoveNoteMutation(noteId, {
      onSuccess: () => {
        startTransition(() => {
          queryClient.invalidateQueries({
            queryKey: ['study', 'notes', studyId],
          });

          router.replace(
            buildUrlWithParams({
              url: PATH.STUDY.MAIN,
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
        let toastMessage =
          '문제 풀이 글 삭제에 실패했습니다. 다시 시도해주세요.';
        let toastType: 'error' | 'info' = 'error';

        if (error instanceof FetchError) {
          const { errorCode, message } = (error.data as ApiErrorData) || {};

          if (errorCode === 'PERMISSION_DENIED' && message) {
            toastMessage = message;
            toastType = 'error';
          }
        }

        showToast({
          message: toastMessage,
          type: toastType,
        });
      },
    });

  const onClick = () => {
    if (isRemoving || isNavigating) {
      return;
    }

    mutateDeleteNote();
  };

  return {
    onClick,
    isRemovingNote: isRemoving || isNavigating,
  };
};
