import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { postAddAssignment } from './post';
import { type PostAddAssignmentRequest } from './type';

export const useAddAssignmentMutation = (
  studyId: number,
  options?: OmittedMutationOptions<void, Error, PostAddAssignmentRequest>,
) => {
  return useMutation({
    mutationKey: ['study', 'custom-assignment', studyId],
    mutationFn: (req) => postAddAssignment(studyId, req),
    ...options,
  });
};
