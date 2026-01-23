import { useState, useTransition } from 'react';

import { useEditNoteMutation } from '@/api/note/patchEditNote/mutation';
import { useParamInt } from '@/hooks/useParamInt';
import { handleApiError } from '@/lib/handleApiError';
import { showToast } from '@/lib/showToast';
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

  const { mutate, isPending } = useEditNoteMutation(noteId, {
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['note', 'detail', noteId] }),
        queryClient.invalidateQueries({
          queryKey: ['study', 'notes', studyId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['study', 'notes', 'maximize', studyId],
        }),
      ]);

      startTransition(() => {
        router.back();
      });

      showToast({
        message: '문제 풀이 글이 수정되었습니다.',
        type: 'success',
      });
    },
    onError: (error) => {
      handleApiError({
        error,
        defaultMessage: '문제 풀이 글 수정에 실패했습니다. 다시 시도해주세요.',
        errorMapping: {
          PERMISSION_DENIED: (message) => ({ message }),
        },
      });
    },
  });

  const isSubmitting = isPending || isNavigating;

  const handleChange = (value?: string) => {
    setContent(value || '');
  };

  const handleSubmit = () => {
    if (isSubmitting) {
      return;
    }

    mutate({ content });
  };

  const resetForm = () => {
    setContent(initialContent);
  };

  return {
    content,
    isDirty:
      content.trim().length > 0 && content.trim() !== initialContent.trim(),
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
