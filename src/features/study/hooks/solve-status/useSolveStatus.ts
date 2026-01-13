import { useTransition } from 'react';

import { useSolveStatusQuery } from '@/api/solve-status/getSolveStatus/query';
import {
  type GetSolveStatusResponse,
  type ViewMethod,
} from '@/api/solve-status/getSolveStatus/type';
import { useRefreshSolveStatusMutation } from '@/api/solve-status/postRefreshSolveStatus/mutation';
import { useParamInt } from '@/hooks/useParamInt';
import { formatRemainingTime } from '@/lib/formatRemainingTime';
import { showToast } from '@/lib/showToast';

type Props = {
  initialData: GetSolveStatusResponse;
  date?: string;
  view?: ViewMethod;
};

export const useSolveStatus = ({ initialData, date, view }: Props) => {
  const studyId = useParamInt('studyId');
  const { data, refetch } = useSolveStatusQuery(
    { studyId, date, view },
    { initialData },
  );
  const [isRefetching, startTransition] = useTransition();

  const { mutate: mutateRefreshSolveStatus, isPending } =
    useRefreshSolveStatusMutation(studyId, {
      onSuccess: () => {
        startTransition(() => {
          refetch();
        });

        showToast({
          message: '문제 풀이 상태가 갱신되었습니다.',
          type: 'success',
        });
      },
      onError: () => {
        showToast({
          message: '문제 풀이 상태 갱신에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  const handleRefresh = () => {
    if (isPending) {
      return;
    }

    const now = new Date();
    const nextRefreshAvailableAt = data?.nextAvailableAt
      ? new Date(data.nextAvailableAt)
      : null;

    if (nextRefreshAvailableAt && now < nextRefreshAvailableAt) {
      const remaining = formatRemainingTime(nextRefreshAvailableAt, now);

      showToast({
        message: `${remaining} 뒤에 다시 시도해주세요.`,
        type: 'warning',
      });

      return;
    }

    mutateRefreshSolveStatus();
  };

  return {
    data,
    isRefreshing: isPending || isRefetching,
    handleRefresh,
  };
};
