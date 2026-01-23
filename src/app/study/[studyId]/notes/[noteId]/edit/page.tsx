import { getNoteDetail } from '@/api/note/getNoteDetail/fetch';
import { NoteUpdateEditor } from '@/features/study/components/note/editor/NoteUpdateEditor';
import { safeParseInt } from '@/lib/parseParam';

type Props = {
  params: Promise<{
    noteId: string;
  }>;
};

const NoteEditPage = async ({ params }: Props) => {
  const noteId = safeParseInt((await params).noteId);
  const note = await getNoteDetail(noteId);

  return (
    <main className="w-full flex-1 overflow-hidden p-5 pt-4 lg:p-8 lg:pt-4">
      <NoteUpdateEditor initialContent={note.content || ''} />
    </main>
  );
};

export default NoteEditPage;
