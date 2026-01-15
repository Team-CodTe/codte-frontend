import { useState, useTransition } from 'react';

import { useWriteNoteMutation } from '@/api/note/postWriteNote/mutation';
import { PATH } from '@/constants/path';
import { useParamInt } from '@/hooks/useParamInt';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
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

  const { mutate: mutateWriteNote, isPending: isWriting } =
    useWriteNoteMutation(studyId, {
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
        let toastMessage =
          '문제 풀이 글 작성에 실패했습니다. 다시 시도해주세요.';
        let toastType: 'error' | 'info' = 'error';

        if (error instanceof FetchError) {
          const { errorCode, message } = (error.data as ApiErrorData) || {};

          if (errorCode === 'INVALID_REQUEST' && message) {
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
    if (isWriting) {
      return;
    }

    if (!selectedProblemId) {
      showToast({
        message: '문제를 선택해주세요',
        type: 'warning',
      });

      return;
    }

    mutateWriteNote({ problemId: selectedProblemId, content });
  };

  const resetForm = () => {
    setContent(initialContent);
  };

  return {
    content,
    isDirty: content.trim().length > 0 && content !== initialContent,
    isSubmitting: isWriting || isNavigating,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
