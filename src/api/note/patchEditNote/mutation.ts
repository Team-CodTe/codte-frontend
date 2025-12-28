import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { patchEditNote } from './patch';
import { type EditNoteRequest } from './type';

export const useEditNoteMutation = (
  noteId: number,
  options?: OmittedMutationOptions<void, Error, EditNoteRequest>,
) => {
  return useMutation({
    mutationKey: ['note', 'edit', noteId],
    mutationFn: (req) => patchEditNote(noteId, req),
    ...options,
  });
};
