import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postWriteNote } from './post';
import { type PostWriteNoteRequest, type PostWriteNoteResponse } from './type';

export const useWriteNoteMutation = (
  studyId: number,
  options?: OmittedMutationOptions<
    PostWriteNoteResponse,
    Error,
    PostWriteNoteRequest
  >,
) => {
  return useMutation({
    mutationKey: ['study', 'note', studyId],
    mutationFn: (req) => postWriteNote(studyId, req),
    ...options,
  });
};
