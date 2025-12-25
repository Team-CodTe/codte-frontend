import { getNoteDetail } from '@/api/note/getNoteDetail/fetch';

type Props = {
  params: Promise<{
    noteId: string;
  }>;
};

const NoteDetailPage = async ({ params }: Props) => {
  const { noteId } = await params;

  const noteIdNum = Number(noteId);

  const noteDetail = await getNoteDetail(noteIdNum);

  console.log(noteDetail);

  return <div>note detail</div>;
};

export default NoteDetailPage;
