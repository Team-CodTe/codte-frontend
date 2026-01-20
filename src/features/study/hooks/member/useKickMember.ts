import { useTransition } from 'react';

import { useKickMemberMutation } from '@/api/member/deleteKickMember/mutation';
import { useParamInt } from '@/hooks/useParamInt';
import { handleApiError } from '@/lib/handleApiError';
import { showToast } from '@/lib/showToast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type Props = {
  memberName: string;
  memberId: number;
};

export const useKickMember = ({ memberName, memberId }: Props) => {
  const studyId = useParamInt('studyId');
  const router = useRouter();
  const [isTransitioning, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useKickMemberMutation(studyId, memberId, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['study', 'members', studyId],
      });

      startTransition(() => {
        router.refresh();
      });

      showToast({
        message: `${memberName}님을 스터디에서 내보냈습니다.`,
        type: 'success',
      });
    },
    onError: (error) => {
      handleApiError({
        error,
        defaultMessage: `${memberName}님을 내보내지 못했습니다. 잠시 후 다시 시도해주세요.`,
      });
    },
  });

  const isKicking = isPending || isTransitioning;

  const handleKick = () => {
    if (isKicking) {
      return;
    }

    mutate();
  };

  return {
    isKicking,
    handleKick,
  };
};
