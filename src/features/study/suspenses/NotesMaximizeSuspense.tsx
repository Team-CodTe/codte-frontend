import { getNotes } from '@/api/note/getNotes/fetch';
import { type GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';
import { withSuspense } from '@/hoc/withSuspense';

import { NotesMaximize } from '../components/note/notes-maximize/NotesMaximize';
import { NotesMaximizeFallback } from '../components/note/notes-maximize/NotesMaximizeFallback';

type Props = {
  study: GetStudyDetailResponse;
  problemId?: number;
  page?: number;
  pageSize?: number;
  assignedDate?: string;
  bojNumber?: number;
  problemTitle?: string;
  updatedDate?: string;
  writer?: string;
};

export const NotesMaximizeSuspense = withSuspense(
  async ({
    study,
    problemId,
    page,
    pageSize,
    assignedDate,
    bojNumber,
    problemTitle,
    updatedDate,
    writer,
  }: Props) => {
    const data = await getNotes({
      studyId: study.id,
      problemId,
      page,
      pageSize,
      assignedDate,
      bojNumber,
      problemTitle,
      updatedDate,
      writer,
    });

    return (
      <NotesMaximize
        studyId={study.id}
        role={study.myRole}
        problemId={problemId}
        page={page}
        pageSize={pageSize}
        initialData={data}
      />
    );
  },
  {
    fallback: <NotesMaximizeFallback />,
  },
);
