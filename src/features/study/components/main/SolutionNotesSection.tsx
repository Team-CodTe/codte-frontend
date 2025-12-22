import type { GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';

import { SolutionNotesTableHeader } from './solution-notes/SolutionNotesTableHeader';

type Props = {
  study: GetStudyDetailResponse;
};

export const SolutionNotesSection = ({ study }: Props) => {
  return (
    <div className="flex h-full flex-col gap-3">
      <SolutionNotesTableHeader studyId={study.id} role={study.myRole} />
    </div>
  );
};
