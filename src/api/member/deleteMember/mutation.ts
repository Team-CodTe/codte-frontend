import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { deleteMember } from './delete';

export const useMemberMutation = (
  studyId: number,
  memberId: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['study', 'members', 'kick', studyId, memberId],
    mutationFn: () => deleteMember(studyId, memberId),
    ...options,
  });
};
