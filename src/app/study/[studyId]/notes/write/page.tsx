import { getNoteTemplate } from '@/api/note/getNoteTemplate/fetch';
import { NoteWriteEditor } from '@/features/study/components/note/editor/NoteWriteEditor';
import { safeParseInt } from '@/lib/parseParam';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
};

const NoteWritePage = async ({ params }: Props) => {
  const studyId = safeParseInt((await params).studyId);
  const noteTemplate = await getNoteTemplate(studyId);

  return (
    <main className="w-full flex-1 overflow-hidden p-5 pt-4 lg:p-8 lg:pt-4">
      <NoteWriteEditor initialContent={noteTemplate.templateContent} />
    </main>
  );
};

export default NoteWritePage;
