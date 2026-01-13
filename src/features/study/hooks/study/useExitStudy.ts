import { useTransition } from 'react';

import { useLeaveStudyMutation } from '@/api/study/deleteLeaveStudy/mutation';
import { useRemoveStudyMutation } from '@/api/study/deleteRemoveStudy/mutation';
import { PATH } from '@/constants/path';
import { useParamInt } from '@/hooks/useParamInt';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';

export const useExitStudy = () => {
  const studyId = useParamInt('studyId');
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const { mutate: mutateLeaveStudy, isPending: isLeaving } =
    useLeaveStudyMutation(studyId, {
      onSuccess: () => {
        startTransition(() => {
          router.replace(PATH.DASHBOARD);
        });

        showToast({ message: '스터디를 탈퇴했습니다.', type: 'success' });
      },
      onError: () => {
        showToast({
          message: '스터디 탈퇴에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  const { mutate: mutateRemoveStudy, isPending: isRemoving } =
    useRemoveStudyMutation(studyId, {
      onSuccess: () => {
        startTransition(() => {
          router.replace(PATH.DASHBOARD);
        });

        showToast({ message: '스터디가 삭제되었습니다.', type: 'success' });
      },
      onError: () => {
        showToast({
          message: '스터디 삭제에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  return {
    mutateLeaveStudy,
    mutateRemoveStudy,
    isLeavingStudy: isLeaving || isNavigating,
    isRemovingStudy: isRemoving || isNavigating,
  };
};
