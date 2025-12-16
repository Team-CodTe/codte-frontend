import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { deleteLeaveStudy } from './delete';

export const useLeaveStudy = (
  studyId: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['study', 'leave', studyId],
    mutationFn: () => deleteLeaveStudy(studyId),
    ...options,
  });
};
