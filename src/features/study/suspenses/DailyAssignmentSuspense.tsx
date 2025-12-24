import { getDailyAssignments } from '@/api/assignment/getDailyAssignments/fetch';
import { withSuspense } from '@/hoc/withSuspense';

import { DailyAssignments } from '../components/main/daily-assignments/DailyAssignments';
import { DailyAssignmentsFallback } from '../components/main/daily-assignments/DailyAssignmentsFallback';

type Props = {
  studyId: number;
};

export const DailyAssignmentSuspense = withSuspense(
  async ({ studyId }: Props) => {
    const data = await getDailyAssignments(studyId);

    return <DailyAssignments studyId={studyId} initialData={data} />;
  },
  { fallback: <DailyAssignmentsFallback /> },
);
