import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { withSuspense } from '@/hoc/withSuspense';

import { NotesMaximize } from '../components/note/notes-maximize/NotesMaximize';
import { NotesMaximizeFallback } from '../components/note/notes-maximize/NotesMaximizeFallback';

type Props = {
  study: GetStudyDetailResponse;
  problemId?: number;
  pageSize?: number;
  assignedDate?: string;
  bojNumber?: number;
  problemTitle?: string;
  updatedDate?: string;
  writer?: string;
};

export const NotesMaximizeSuspense = withSuspense(
  ({
    study,
    problemId,
    pageSize,
    assignedDate,
    bojNumber,
    problemTitle,
    updatedDate,
    writer,
  }: Props) => {
    return (
      <NotesMaximize
        studyId={study.id}
        role={study.myRole}
        problemId={problemId}
        pageSize={pageSize}
        assignedDate={assignedDate}
        bojNumber={bojNumber}
        problemTitle={problemTitle}
        updatedDate={updatedDate}
        writer={writer}
      />
    );
  },
  {
    fallback: <NotesMaximizeFallback />,
  },
);
