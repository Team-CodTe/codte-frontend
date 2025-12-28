import { getNoteDetail } from '@/api/note/getNoteDetail/fetch';
import { NoteUpdateEditor } from '@/features/study/components/note/NoteUpdateEditor';

type Props = {
  params: Promise<{
    noteId: string;
  }>;
};

const EditNotePage = async ({ params }: Props) => {
  const { noteId } = await params;
  const noteIdNum = parseInt(noteId, 10);
  const note = await getNoteDetail(noteIdNum);

  return (
    <main className="w-full flex-1 overflow-hidden p-5 pt-4 lg:p-8 lg:pt-4">
      <NoteUpdateEditor
        noteId={noteIdNum}
        initialContent={note.content || ''}
      />
    </main>
  );
};

export default EditNotePage;
