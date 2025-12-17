import type { GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';

import { SolutionNoteTableHeader } from './solution-note/SolutionNoteTableHeader';

type Props = {
  study: GetStudyDetailResponse;
};

export const SolutionNoteSection = ({ study }: Props) => {
  return (
    <div className="flex h-full flex-col space-y-3">
      <SolutionNoteTableHeader studyId={study.id} role={study.myRole} />
    </div>
  );
};
