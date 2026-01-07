import { useState, useTransition } from 'react';

import { useEditNoteMutation } from '@/api/note/patchEditNote/mutation';
import { useParamInt } from '@/hooks/useParamInt';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type Props = {
  initialContent: string;
};

export const useEditNote = ({ initialContent }: Props) => {
  const studyId = useParamInt('studyId');
  const noteId = useParamInt('noteId');
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

        await queryClient.invalidateQueries({
          queryKey: ['study', 'notes', studyId],
        });

        await queryClient.invalidateQueries({
          queryKey: ['study', 'notes', 'maximize', studyId],
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

  const handleChange = (value?: string) => {
    setContent(value || '');
  };

  const handleSubmit = () => {
    if (isUpdating) {
      return;
    }

    mutateUpdateNote({ content });
  };

  const resetForm = () => {
    setContent(initialContent);
  };

  return {
    content,
    isDirty: content.trim().length > 0 && content !== initialContent,
    isSubmitting: isUpdating || isNavigating,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
