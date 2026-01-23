import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { type GetNoteReviewResponse } from '../getNoteReview/type';
import { postCreateNoteReview } from './post';

export const useCreateNoteReviewMutation = (
  noteId: number,
  options?: OmittedMutationOptions<GetNoteReviewResponse, Error, void>,
) => {
  return useMutation({
    mutationKey: ['note', 'detail', 'review', noteId],
    mutationFn: () => postCreateNoteReview(noteId),
    ...options,
  });
};
