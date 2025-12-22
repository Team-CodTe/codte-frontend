import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { StudyTemplateUpdateEditor } from '@/features/study/components/solution-note/StudyTemplateUpdateEditor';

type Props = {
  params: Promise<{
    studyId: number;
  }>;
};

const SolutionNoteTemplatePage = async ({ params }: Props) => {
  const { studyId } = await params;
  const study = await getStudyDetail(studyId);

  return (
    <main className="w-full flex-1 overflow-hidden p-5 pt-0 lg:p-8 lg:pt-0">
      <StudyTemplateUpdateEditor
        studyId={studyId}
        initialTemplate={study.templateContent ?? ''}
      />
    </main>
  );
};

export default SolutionNoteTemplatePage;
