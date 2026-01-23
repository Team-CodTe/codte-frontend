import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postCustomAssignment } from './post';
import { type PostCustomAssignmentRequest } from './type';

export const useCustomAssignmentMutation = (
  studyId: number,
  options?: OmittedMutationOptions<void, Error, PostCustomAssignmentRequest>,
) => {
  return useMutation({
    mutationKey: ['study', 'custom-assignment', studyId],
    mutationFn: (req) => postCustomAssignment(studyId, req),
    ...options,
  });
};
