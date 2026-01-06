import { useTransition } from 'react';

import { useDailyAssignmentsQuery } from '@/api/assignment/getDailyAssignments/query';
import { type GetDailyAssignmentsResponse } from '@/api/assignment/getDailyAssignments/type';
import { useRefreshDailyAssignmentsMutation } from '@/api/assignment/postRefreshDailyAssignments/mutation';
import { useParamInt } from '@/hooks/useParamInt';
import { formatRemainingTime } from '@/lib/formatRemainingTime';
import { showToast } from '@/lib/showToast';

type Props = {
  initialData: GetDailyAssignmentsResponse;
};

export const useDailyAssignments = ({ initialData }: Props) => {
  const studyId = useParamInt('studyId');
  const { data, refetch } = useDailyAssignmentsQuery(studyId, { initialData });
  const [isRefetching, startTransition] = useTransition();

  const { mutate: mutateRefreshDailyAssignments, isPending } =
    useRefreshDailyAssignmentsMutation(studyId, {
      onSuccess: () => {
        startTransition(() => {
          refetch();
        });

        showToast({
          message: '오늘의 추천 문제가 갱신되었습니다.',
          type: 'success',
        });
      },
      onError: () => {
        showToast({
          message: '오늘의 추천 문제 갱신에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  const onRefresh = () => {
    if (isPending) {
      return;
    }

    const now = new Date();
    const nextRefreshAvailableAt = data?.nextRefreshAvailableAt
      ? new Date(data.nextRefreshAvailableAt)
      : null;

    if (nextRefreshAvailableAt && now < nextRefreshAvailableAt) {
      const remaining = formatRemainingTime(nextRefreshAvailableAt, now);

      showToast({
        message: `${remaining} 뒤에 다시 시도해주세요.`,
        type: 'warning',
      });

      return;
    }

    mutateRefreshDailyAssignments();
  };

  return {
    data,
    isRefreshing: isPending || isRefetching,
    onRefresh,
  };
};
