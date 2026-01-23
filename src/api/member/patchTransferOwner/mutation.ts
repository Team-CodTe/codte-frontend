import { type OmittedMutationOptions } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

import { patchTransferOwner } from './patch';

export const useTransferOwnerMutation = (
  studyId: number,
  memberId: number,
  options?: OmittedMutationOptions<void>,
) => {
  return useMutation({
    mutationKey: ['study', 'members', 'transfer-owner', studyId, memberId],
    mutationFn: () => patchTransferOwner(studyId, memberId),
    ...options,
  });
};
