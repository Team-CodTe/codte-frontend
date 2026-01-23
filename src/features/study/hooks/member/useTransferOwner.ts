import { useTransition } from 'react';

import { useTransferOwnerMutation } from '@/api/member/patchTransferOwner/mutation';
import { useParamInt } from '@/hooks/useParamInt';
import { handleApiError } from '@/lib/handleApiError';
import { showToast } from '@/lib/showToast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type Props = {
  memberName: string;
  memberId: number;
};

export const useTransferOwner = ({ memberName, memberId }: Props) => {
  const studyId = useParamInt('studyId');
  const router = useRouter();
  const [isTransitioning, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useTransferOwnerMutation(studyId, memberId, {
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['study', 'members', studyId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['study', 'detail', studyId],
        }),
      ]);

      startTransition(() => {
        router.refresh();
      });

      showToast({
        message: `${memberName}님에게 스터디장이 위임되었습니다.`,
        type: 'success',
      });
    },
    onError: (error) => {
      handleApiError({
        error,
        defaultMessage: `${memberName}님에게 스터디장을 위임하는데 실패했습니다. 잠시 후 다시 시도해주세요.`,
      });
    },
  });

  const isTransferring = isPending || isTransitioning;

  const handleTransferOwner = () => {
    if (isTransferring) {
      return;
    }

    mutate();
  };

  return {
    isTransferring,
    handleTransferOwner,
  };
};
