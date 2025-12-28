import { NoteSuspense } from '@/features/study/suspenses/NoteSuspense';

type Props = {
  params: Promise<{
    studyId: string;
    noteId: string;
  }>;
};

const NoteDetailPage = async ({ params }: Props) => {
  const { studyId, noteId } = await params;
  const studyIdNum = Number(studyId);
  const noteIdNum = Number(noteId);

  return (
    <main className="min-h-0 w-full flex-1 overflow-y-auto">
      <NoteSuspense studyId={studyIdNum} noteId={noteIdNum} />
    </main>
  );
};

export default NoteDetailPage;
