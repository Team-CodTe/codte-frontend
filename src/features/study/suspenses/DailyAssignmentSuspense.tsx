import { getDailyAssignments } from '@/api/assignment/getDailyAssignments/fetch';
import { withSuspense } from '@/hoc/withSuspense';
import type { StudyRole } from '@/types/studyRole';

import { DailyAssignments } from '../components/main/daily-assignments/DailyAssignments';
import { DailyAssignmentsFallback } from '../components/main/daily-assignments/DailyAssignmentsFallback';

type Props = {
  studyId: number;
  role: StudyRole;
};

export const DailyAssignmentSuspense = withSuspense(
  async ({ studyId, role }: Props) => {
    const data = await getDailyAssignments(studyId);

    return (
      <DailyAssignments studyId={studyId} initialData={data} role={role} />
    );
  },
  { fallback: <DailyAssignmentsFallback /> },
);
