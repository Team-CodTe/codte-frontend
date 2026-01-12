import { getNoteDetail } from '@/api/note/getNoteDetail/fetch';
import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import { withSuspense } from '@/hoc/withSuspense';

import { NoteDetail } from '../../components/note/detail/NoteDetail';
import { NoteDetailFallback } from '../../components/note/detail/NoteDetailFallback';

type Props = {
  studyId: number;
  noteId: number;
};

export const NoteSuspense = withSuspense(
  async ({ studyId, noteId }: Props) => {
    const [user, note] = await Promise.all([
      getMyProfile(),
      getNoteDetail(noteId),
    ]);

    return (
      <NoteDetail studyId={studyId} initialUser={user} initialNote={note} />
    );
  },
  { fallback: <NoteDetailFallback /> },
);
