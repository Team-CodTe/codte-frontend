import { NoteSuspense } from '@/features/study/suspenses/NoteSuspense';
import { safeParseInt } from '@/lib/parseParam';

type Props = {
  params: Promise<{
    studyId: string;
    noteId: string;
  }>;
};

const NoteDetailPage = async ({ params }: Props) => {
  const studyId = safeParseInt((await params).studyId);
  const noteId = safeParseInt((await params).noteId);

  return (
    <main className="min-h-0 w-full flex-1 overflow-y-auto">
      <NoteSuspense studyId={studyId} noteId={noteId} />
    </main>
  );
};

export default NoteDetailPage;
