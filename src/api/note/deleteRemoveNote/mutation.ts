import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { deleteRemoveNote } from './delete';

export const useRemoveNoteMutation = (
  noteId: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['note', 'remove', noteId],
    mutationFn: () => deleteRemoveNote(noteId),
    ...options,
  });
};
