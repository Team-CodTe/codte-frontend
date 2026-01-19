import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { withSuspense } from '@/hoc/withSuspense';

import { NotesMaximize } from '../../components/note/notes-maximize/NotesMaximize';
import { NotesMaximizeFallback } from '../../components/note/notes-maximize/NotesMaximizeFallback';

type Props = {
  study: GetStudyDetailResponse;
};

export const NotesMaximizeSuspense = withSuspense(
  ({ study }: Props) => {
    return <NotesMaximize studyId={study.id} role={study.myRole} />;
  },
  {
    fallback: <NotesMaximizeFallback />,
  },
);
