import type { GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';

import { DailyAssignmentSuspense } from '../../suspenses/DailyAssignmentSuspense';
import { DailyAssignmentsTableHeader } from './daily-assignments/DailyAssignmentsTableHeader';

type Props = {
  study: GetStudyDetailResponse;
};

export const DailyAssignmentsSection = ({ study }: Props) => {
  return (
    <div className="flex h-full flex-col gap-3">
      <DailyAssignmentsTableHeader studyId={study.id} role={study.myRole} />
      <DailyAssignmentSuspense studyId={study.id} />
    </div>
  );
};
