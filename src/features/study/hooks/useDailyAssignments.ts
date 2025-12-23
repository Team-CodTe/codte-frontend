import { useDailyAssignmentsQuery } from '@/api/daily-assignment/getDailyAssignments/query';
import { type GetDailyAssignmentsResponse } from '@/api/daily-assignment/getDailyAssignments/type';
import { useRefreshDailyAssignmentsMutation } from '@/api/daily-assignment/postRefreshDailyAssignments/mutation';
import { formatRemainingTime } from '@/lib/formatRemainingTime';
import { showToast } from '@/lib/showToast';

type Props = {
  studyId: number;
  initialData: GetDailyAssignmentsResponse;
};

export const useDailyAssignments = ({ studyId, initialData }: Props) => {
  const { data, refetch } = useDailyAssignmentsQuery(studyId, { initialData });

  const { mutate: mutateRefreshDailyAssignments, isPending: isRefreshing } =
    useRefreshDailyAssignmentsMutation(studyId, {
      onSuccess: () => {
        refetch();
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
    if (isRefreshing) {
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
    isRefreshing,
    onRefresh,
  };
};
