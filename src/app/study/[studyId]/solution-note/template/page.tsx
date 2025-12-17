import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { StudyTemplateUpdateEditor } from '@/features/study/components/solution-note/SolutionNoteWritingEditor';

type Props = {
  params: Promise<{
    studyId: number;
  }>;
};

const SolutionNoteTemplatePage = async ({ params }: Props) => {
  const { studyId } = await params;
  const study = await getStudyDetail(studyId);

  return (
    <main className="min-h-0 w-full flex-1 overflow-y-auto">
      <StudyTemplateUpdateEditor
        studyId={studyId}
        initialTemplate={study.templateContent ?? ''}
      />
    </main>
  );
};

export default SolutionNoteTemplatePage;
