import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { deleteRemoveStudy } from './delete';

export const useRemoveStudy = (
  id: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['study', 'remove', id],
    mutationFn: () => deleteRemoveStudy(id),
    ...options,
  });
};
