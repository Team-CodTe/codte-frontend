'use client';

import { useSolveStatisticsQuery } from '@/api/solve-status/getSolveStatistics/query';
import { type SolveStatisticsMemberResponse } from '@/api/solve-status/getSolveStatistics/type';
import { type ViewMethod } from '@/api/solve-status/getSolveStatus/type';
import { formatPercentage } from '@/lib/formatFunc';
import {
  eachDayOfInterval,
  format,
  parseISO,
  startOfDay,
  subDays,
} from 'date-fns';

import { RANGE_DAYS } from '../../constants/heatmap';
import { StatisticsCard } from './StatisticsCard';
import { StatisticsHeatmap } from './StatisticsHeatmap';

type Props = {
  studyId: number;
  initialData: SolveStatisticsMemberResponse;
  view: ViewMethod;
};

const getDateKey = (date: Date) => format(date, 'yyyy-MM-dd');

export const Statistics = ({ studyId, initialData, view }: Props) => {
  const { data } = useSolveStatisticsQuery({ studyId, view }, { initialData });
  const myStatistics = data as SolveStatisticsMemberResponse;

  const today = startOfDay(new Date());
  const startDate = subDays(today, RANGE_DAYS);

  const dailyCountsByDate = new Map(
    myStatistics.dailyStatistics.map((dailyStatistic) => {
      const dateKey = getDateKey(parseISO(dailyStatistic.date));

      return [
        dateKey,
        dailyStatistic.problemStatusSummary.completedCount,
      ] as const;
    }),
  );

  const heatmapValues = eachDayOfInterval({ start: startDate, end: today }).map(
    (date) => {
      const dateKey = getDateKey(date);

      return { date, count: dailyCountsByDate.get(dateKey) ?? 0 };
    },
  );

  return (
    <div className="flex w-full flex-col gap-2">
      <StatisticsHeatmap
        startDate={startDate}
        endDate={today}
        values={heatmapValues}
      />

      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
        <StatisticsCard
          label="전체 추천 문제 수"
          value={myStatistics.totalAssigned}
        />
        <StatisticsCard
          label="푼 문제 수"
          value={myStatistics.problemStatusSummary.completedCount}
          subValue={formatPercentage(myStatistics.problemCompletionRate, 2)}
        />
        <StatisticsCard
          label="작성한 풀이 글 수"
          value={myStatistics.noteStatusSummary.completedCount}
          subValue={formatPercentage(myStatistics.noteCompletionRate, 2)}
        />
      </div>
    </div>
  );
};
