'use client';

import { useSolveStatisticsQuery } from '@/api/solve-status/getSolveStatistics/query';
import { type SolveStatisticsMemberResponse } from '@/api/solve-status/getSolveStatistics/type';
import { type ViewMethod } from '@/api/solve-status/getSolveStatus/type';
import {
  eachDayOfInterval,
  format,
  parseISO,
  startOfDay,
  subDays,
} from 'date-fns';

import { RANGE_DAYS } from '../../constants/heatmap';
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
    <div className="flex w-full flex-col gap-3">
      <StatisticsHeatmap
        startDate={startDate}
        endDate={today}
        values={heatmapValues}
      />
    </div>
  );
};
