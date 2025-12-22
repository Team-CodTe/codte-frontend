import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postRefreshDailyAssignments } from './post';

export const useRefreshDailyAssignmentsMutation = (
  studyId: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['daily-assignments', studyId],
    mutationFn: () => postRefreshDailyAssignments(studyId),
    ...options,
  });
};
