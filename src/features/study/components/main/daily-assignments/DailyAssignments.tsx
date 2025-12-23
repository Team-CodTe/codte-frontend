'use client';

import { useDailyAssignmentsQuery } from '@/api/daily-assignment/getDailyAssignments/query';
import { type GetDailyAssignmentsResponse } from '@/api/daily-assignment/getDailyAssignments/type';
import { useRefreshDailyAssignmentsMutation } from '@/api/daily-assignment/postRefreshDailyAssignments/mutation';
import { HintTooltip } from '@/components/common/HintTooltip';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { formatDate } from '@/lib/formatDate';
import { formatRemainingTime } from '@/lib/formatRemainingTime';
import { showToast } from '@/lib/showToast';
import { InfoIcon } from 'lucide-react';

import { DailyAssignmentsTableColumns } from './DailyAssignmentsColumns';
import { DailyAssignmentsTable } from './DailyAssignmentsTable';

type Props = {
  studyId: number;
  initialData: GetDailyAssignmentsResponse;
};

export const DailyAssignments = ({ studyId, initialData }: Props) => {
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

  const onClickRefreshDailyAssignments = () => {
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

  return (
    <div className="flex min-h-0 flex-col gap-3 md:flex-1">
      <DailyAssignmentsTable
        data={data?.assignments ?? []}
        columns={DailyAssignmentsTableColumns}
      />

      <div className="text-muted-foreground flex flex-col items-end justify-end gap-1 text-xs">
        <span>{formatDate(data?.refreshedAt)} 기준</span>
        <div className="flex items-center gap-1">
          <HintTooltip content="30분에 한 번씩 할 수 있어요.">
            <InfoIcon className="size-3" />
          </HintTooltip>
          <Button
            variant="link"
            size="sm"
            onClick={onClickRefreshDailyAssignments}
            disabled={isRefreshing}
            className="text-muted-foreground hover:text-foreground h-4 p-0 text-xs">
            {isRefreshing ? <Spinner className="size-3" /> : null}
            {isRefreshing ? '갱신 중...' : '추천 문제 강제 갱신'}
          </Button>
        </div>
      </div>
    </div>
  );
};
