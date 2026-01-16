import { type GetMyStudiesResponse } from '@/api/study/getMyStudies/type';
import { ChartColumnIncreasingIcon } from 'lucide-react';

import { StatisticsStudySelect } from './StatisticsStudySelect';

type Props = {
  initialData: GetMyStudiesResponse[];
  defaultStudyId: number;
};

export const StatisticsHeader = ({ initialData, defaultStudyId }: Props) => {
  return (
    <div className="flex min-h-8 w-full flex-row items-center justify-between gap-3">
      <div className="text-muted-foreground flex h-8 shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
        <ChartColumnIncreasingIcon className="size-3.5" />
        <span>문제 풀이 통계</span>
      </div>

      <StatisticsStudySelect
        initialData={initialData}
        defaultStudyId={defaultStudyId}
      />
    </div>
  );
};
