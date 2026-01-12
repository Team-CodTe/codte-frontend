import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { withSuspense } from '@/hoc/withSuspense';

import { NotesMaximize } from '../../components/note/notes-maximize/NotesMaximize';
import { NotesMaximizeFallback } from '../../components/note/notes-maximize/NotesMaximizeFallback';

type Props = {
  study: GetStudyDetailResponse;
  problemId?: number;
  pageSize?: number;
};

export const NotesMaximizeSuspense = withSuspense(
  ({ study, problemId, pageSize }: Props) => {
    return (
      <NotesMaximize
        studyId={study.id}
        role={study.myRole}
        problemId={problemId}
        pageSize={pageSize}
      />
    );
  },
  {
    fallback: <NotesMaximizeFallback />,
  },
);
