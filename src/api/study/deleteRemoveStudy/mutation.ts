import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { deleteRemoveStudy } from './delete';

export const useRemoveStudy = (
  studyId: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['study', 'remove', studyId],
    mutationFn: () => deleteRemoveStudy(studyId),
    ...options,
  });
};
