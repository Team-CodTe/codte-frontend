import { useTransition } from 'react';

import { useLeaveStudy } from '@/api/study/deleteLeaveStudy/mutation';
import { PATH } from '@/constants/path';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';

type Props = {
  id: number;
};

export const useExitStudy = ({ id }: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const { mutate: mutateLeaveStudy, isPending: isLeavingStudy } = useLeaveStudy(
    id,
    {
      onSuccess: () => {
        startTransition(() => {
          router.replace(PATH.STUDY.HOME);
          router.refresh();
        });
      },
      onError: (error) => {
        console.log('❌ 스터디 탈퇴 실패', error);

        showToast({
          message: '스터디 탈퇴에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    },
  );

  return {
    mutateLeaveStudy,
    isLeavingStudy: isLeavingStudy || isNavigating,
  };
};
