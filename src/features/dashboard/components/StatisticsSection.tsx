import { getMyStudies } from '@/api/study/getMyStudies/fetch';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { redirect } from 'next/navigation';

import { StatisticsSuspense } from '../suspenses/StatisticsSuspense';
import { StatisticsEmptyContent } from './statistics/StatisticsEmptyContent';
import { StatisticsHeader } from './statistics/StatisticsHeader';

type Props = {
  studyId?: number;
};

export const StatisticsSection = async ({ studyId }: Props) => {
  const studies = await getMyStudies();

  if (!studies.length) {
    return <StatisticsEmptyContent />;
  }

  const defaultStudyId = studies[0].studyId;
  const isValidStudyId = studyId && studies.some((s) => s.studyId === studyId);
  const activeStudyId = isValidStudyId ? studyId! : defaultStudyId;

  if (studyId && !isValidStudyId) {
    redirect(buildUrlWithParams({ url: PATH.DASHBOARD }));
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <StatisticsHeader initialData={studies} defaultStudyId={defaultStudyId} />
      <StatisticsSuspense studyId={activeStudyId} />
    </div>
  );
};
