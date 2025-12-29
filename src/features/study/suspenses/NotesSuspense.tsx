import { getNotes } from '@/api/note/getNotes/fetch';
import { withSuspense } from '@/hoc/withSuspense';

import { Notes } from '../components/main/notes/Notes';
import { NotesFallback } from '../components/main/notes/NotesFallback';

type Props = {
  studyId: number;
  problemId?: number;
  page?: number;
  pageSize?: number;
};

export const NotesSuspense = withSuspense(
  async ({ studyId, problemId, page, pageSize }: Props) => {
    const data = await getNotes({
      studyId,
      problemId,
      page,
      pageSize,
    });

    return (
      <Notes
        studyId={studyId}
        problemId={problemId}
        page={page}
        pageSize={pageSize}
        initialData={data}
      />
    );
  },
  {
    fallback: <NotesFallback />,
  },
);
