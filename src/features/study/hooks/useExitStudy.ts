import { useTransition } from 'react';

import { useLeaveStudy } from '@/api/study/deleteLeaveStudy/mutation';
import { useRemoveStudy } from '@/api/study/deleteRemoveStudy/mutation';
import { PATH } from '@/constants/path';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';

type Props = {
  studyId: number;
};

export const useExitStudy = ({ studyId }: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const { mutate: mutateLeaveStudy, isPending: isLeavingStudy } = useLeaveStudy(
    studyId,
    {
      onSuccess: () => {
        showToast({
          message: '스터디를 탈퇴했습니다.',
          type: 'success',
        });

        startTransition(() => {
          router.replace(PATH.STUDY.HOME);
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

  const { mutate: mutateRemoveStudy, isPending: isRemovingStudy } =
    useRemoveStudy(studyId, {
      onSuccess: () => {
        showToast({
          message: '스터디가 삭제되었습니다.',
          type: 'success',
        });

        startTransition(() => {
          router.replace(PATH.STUDY.HOME);
        });
      },
      onError: (error) => {
        console.log('❌ 스터디 삭제 실패', error);

        showToast({
          message: '스터디 삭제에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  return {
    mutateLeaveStudy,
    mutateRemoveStudy,
    isLeavingStudy: isLeavingStudy || isNavigating,
    isRemovingStudy: isRemovingStudy || isNavigating,
  };
};
