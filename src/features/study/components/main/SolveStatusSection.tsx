import { VIEW_METHOD } from '@/api/solve-status/getSolveStatus/type';
import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';

import { SolveStatusSuspense } from '../../suspenses/solve-status/SolveStatusSuspense';
import { SolveStatusTableHeader } from './solve-status/SolveStatusTableHeader';

type Props = {
  study: GetStudyDetailResponse;
};

export const SolveStatusSection = ({ study }: Props) => {
  return (
    <div className="flex min-h-0 flex-col gap-3 md:flex-1">
      <SolveStatusTableHeader />
      <SolveStatusSuspense studyId={study.id} view={VIEW_METHOD.GROUP} />
    </div>
  );
};
