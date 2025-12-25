import { getNoteTemplate } from '@/api/note/getNoteTemplate/fetch';
import { NoteWriteEditor } from '@/features/study/components/note/NoteWriteEditor';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
  searchParams: Promise<{
    problemId?: string;
  }>;
};

const NoteWritePage = async ({ params, searchParams }: Props) => {
  const { studyId } = await params;
  const { problemId } = await searchParams;
  const studyIdNum = Number(studyId);
  const problemIdNum = problemId ? Number(problemId) : null;
  const noteTemplate = await getNoteTemplate(studyIdNum);

  return (
    <main className="w-full flex-1 overflow-hidden p-5 pt-4 lg:p-8 lg:pt-4">
      <NoteWriteEditor
        studyId={studyIdNum}
        problemId={problemIdNum}
        initialContent={noteTemplate.templateContent}
      />
    </main>
  );
};

export default NoteWritePage;
