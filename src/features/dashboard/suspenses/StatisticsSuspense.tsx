import { getSolveStatistics } from '@/api/solve-status/getSolveStatistics/fetch';
import { isSolveStatisticsMemberResponse } from '@/api/solve-status/getSolveStatistics/type';
import { VIEW_METHOD } from '@/api/solve-status/getSolveStatus/type';
import { withSuspense } from '@/hoc/withSuspense';

import { Statistics } from '../components/statistics/Statistics';
import { StatisticsFallback } from '../components/statistics/StatisticsFallback';

type Props = {
  studyId: number;
};

export const StatisticsSuspense = withSuspense(
  async ({ studyId }: Props) => {
    const view = VIEW_METHOD.ME;
    const data = await getSolveStatistics({ studyId, view });

    if (!isSolveStatisticsMemberResponse(data)) {
      return <StatisticsFallback />;
    }

    return <Statistics studyId={studyId} initialData={data} view={view} />;
  },
  {
    fallback: <StatisticsFallback />,
  },
);
