import { getNoteDetail } from '@/api/note/getNoteDetail/fetch';
import { DynamicMarkdownPreview } from '@/components/common/MarkdownPreview';
import { NoteDetailTitle } from '@/features/study/components/note/NoteDetailTitle';

type Props = {
  params: Promise<{
    noteId: string;
  }>;
};

const NoteDetailPage = async ({ params }: Props) => {
  const { noteId } = await params;
  const noteIdNum = Number(noteId);
  const note = await getNoteDetail(noteIdNum);

  return (
    <main className="min-h-0 w-full flex-1 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 p-5 pt-4 pb-8 md:gap-12 md:px-0 md:pt-4 md:pb-16">
        <NoteDetailTitle note={note} />
        <DynamicMarkdownPreview value={note.content} />
      </div>
    </main>
  );
};

export default NoteDetailPage;
