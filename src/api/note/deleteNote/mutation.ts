import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { deleteNote } from './delete';

export const useDeleteNoteMutation = (
  noteId: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['note', 'delete', noteId],
    mutationFn: () => deleteNote(noteId),
    ...options,
  });
};
