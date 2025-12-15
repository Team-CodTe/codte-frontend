import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { deleteLeaveStudy } from './delete';

export const useLeaveStudy = (
  id: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['study', 'leave', id],
    mutationFn: () => deleteLeaveStudy(id),
    ...options,
  });
};
