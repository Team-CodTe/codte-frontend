import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postRefreshSolveStatus } from './post';

export const useRefreshSolveStatusMutation = (
  studyId: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['study', 'solve-status', studyId],
    mutationFn: () => postRefreshSolveStatus(studyId),
    ...options,
  });
};
