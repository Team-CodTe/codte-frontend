import { type GetNoteReviewResponse } from '@/api/note/getNoteReview/type';
import { useCreateNoteReviewMutation } from '@/api/note/postCreateNoteReview/mutation';
import { useParamInt } from '@/hooks/useParamInt';
import { handleApiError } from '@/lib/handleApiError';
import { showToast } from '@/lib/showToast';
import { useQueryClient } from '@tanstack/react-query';

export const useNoteReview = () => {
  const noteId = useParamInt('noteId');

  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateNoteReviewMutation(noteId, {
    onSuccess: (data) => {
      queryClient.setQueryData<GetNoteReviewResponse>(
        ['note', 'detail', 'review', noteId],
        data,
      );

      showToast({
        message: '리뷰가 생성되었습니다.',
        type: 'success',
      });
    },
    onError: (error) => {
      handleApiError({
        error,
        defaultMessage: '리뷰 생성에 실패했습니다.',
        errorMapping: {
          PERMISSION_DENIED: (message) => ({ message }),
          GEMINI_API_ERROR: (message) => ({ message }),
        },
      });
    },
  });

  const handleCreateReview = () => {
    if (isPending) {
      return;
    }

    mutate();
  };

  return {
    handleCreateReview,
    isPending,
  };
};
