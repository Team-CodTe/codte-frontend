import { useState, useTransition } from 'react';

import { useEditNoteMutation } from '@/api/note/patchEditNote/mutation';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type Props = {
  noteId: number;
  initialContent: string;
};

export const useUpdateNote = ({ noteId, initialContent }: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const [content, setContent] = useState(initialContent);
  const queryClient = useQueryClient();

  const { mutate: mutateUpdateNote, isPending: isUpdating } =
    useEditNoteMutation(noteId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['note', 'detail', noteId],
        });

        startTransition(() => {
          router.back();
        });

        showToast({
          message: '문제 풀이 글이 수정되었습니다.',
          type: 'success',
        });
      },
      onError: (error) => {
        let toastMessage =
          '문제 풀이 글 수정에 실패했습니다. 다시 시도해주세요.';
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

  const onChange = (value?: string) => {
    setContent(value || '');
  };

  const onSubmit = () => {
    if (isUpdating) {
      return;
    }

    mutateUpdateNote({ content });
  };

  const onReset = () => {
    setContent(initialContent);
  };

  return {
    content,
    isDirty: content.trim().length > 0 && content !== initialContent,
    isSubmitting: isUpdating || isNavigating,
    onChange,
    onSubmit,
    onReset,
  };
};
