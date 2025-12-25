import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postCreateNote } from './post';
import {
  type PostCreateNoteRequest,
  type PostCreateNoteResponse,
} from './type';

export const useCreateNoteMutation = (
  studyId: number,
  options?: OmittedMutationOptions<
    PostCreateNoteResponse,
    Error,
    PostCreateNoteRequest
  >,
) => {
  return useMutation({
    mutationKey: ['study', 'note', studyId],
    mutationFn: (req) => postCreateNote(studyId, req),
    ...options,
  });
};
