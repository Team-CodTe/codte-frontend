import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { deleteKickMember } from './delete';

export const useKickMemberMutation = (
  studyId: number,
  memberId: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['study', 'members', 'kick', studyId, memberId],
    mutationFn: () => deleteKickMember(studyId, memberId),
    ...options,
  });
};
