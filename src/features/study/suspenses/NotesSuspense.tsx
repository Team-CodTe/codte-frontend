import { getNotes } from '@/api/note/getNotes/fetch';
import { withSuspense } from '@/hoc/withSuspense';

import { Notes } from '../components/main/notes/Notes';
import { NotesFallback } from '../components/main/notes/NotesFallback';

type Props = {
  studyId: number;
  problemId?: number;
  pageSize?: number;
};

export const NotesSuspense = withSuspense(
  async ({ studyId, problemId, pageSize }: Props) => {
    const data = await getNotes({
      studyId,
      problemId,
      pageSize,
    });

    return (
      <Notes
        studyId={studyId}
        problemId={problemId}
        pageSize={pageSize}
        initialData={data}
      />
    );
  },
  {
    fallback: <NotesFallback />,
  },
);
