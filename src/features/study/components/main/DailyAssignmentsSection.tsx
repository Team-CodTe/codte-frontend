import type { GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';

import { DailyAssignmentSuspense } from '../../suspenses/DailyAssignmentSuspense';
import { DailyAssignmentsTableHeader } from './daily-assignments/DailyAssignmentsTableHeader';

type Props = {
  study: GetStudyDetailResponse;
};

export const DailyAssignmentsSection = ({ study }: Props) => {
  return (
    <div className="flex min-h-0 flex-col gap-3 md:flex-1">
      <DailyAssignmentsTableHeader studyId={study.id} role={study.myRole} />
      <DailyAssignmentSuspense studyId={study.id} />
    </div>
  );
};
