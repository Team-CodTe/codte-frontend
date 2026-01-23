import { useState, useTransition } from 'react';

import { useWriteNoteMutation } from '@/api/note/postWriteNote/mutation';
import { PATH } from '@/constants/path';
import { useParamInt } from '@/hooks/useParamInt';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { handleApiError } from '@/lib/handleApiError';
import { showToast } from '@/lib/showToast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';

type Props = {
  initialContent: string;
};

export const useWriteNote = ({ initialContent }: Props) => {
  const studyId = useParamInt('studyId');
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const [content, setContent] = useState(initialContent);
  const queryClient = useQueryClient();
  const [urlProblemId] = useQueryState('problemId', parseAsInteger);

  const selectedProblemId = urlProblemId ?? null;

  const { mutate, isPending } = useWriteNoteMutation(studyId, {
    onSuccess: (data) => {
      startTransition(() => {
        queryClient.invalidateQueries({
          queryKey: ['study', 'notes', studyId],
        });

        queryClient.invalidateQueries({
          queryKey: ['study', 'solve-status', studyId],
        });

        queryClient.invalidateQueries({
          queryKey: ['study', 'solve-statistics', studyId],
        });

        router.replace(
          buildUrlWithParams({
            url: PATH.STUDY.NOTES.DETAIL,
            pathParams: {
              studyId,
              noteId: data.id,
            },
          }),
        );
      });

      showToast({
        message: '문제 풀이 글이 추가되었습니다.',
        type: 'success',
      });
    },
    onError: (error) => {
      handleApiError({
        error,
        defaultMessage: '문제 풀이 글 작성에 실패했습니다. 다시 시도해주세요.',
        errorMapping: {
          INVALID_REQUEST: (message) => ({ message, type: 'error' }),
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

    if (!selectedProblemId) {
      showToast({
        message: '문제를 선택해주세요',
        type: 'warning',
      });

      return;
    }

    mutate({ problemId: selectedProblemId, content });
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
