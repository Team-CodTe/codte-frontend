import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { AccessDeniedRedirect } from '@/features/study/components/note/AccessDeniedRedirect';
import { NoteTemplateUpdateEditor } from '@/features/study/components/note/NoteTemplateUpdateEditor';
import { STUDY_ROLE } from '@/types/studyRole';

type Props = {
  params: Promise<{
    studyId: number;
  }>;
};

const SolutionNoteTemplatePage = async ({ params }: Props) => {
  const { studyId } = await params;
  const study = await getStudyDetail(studyId);

  if (study.myRole !== STUDY_ROLE.OWNER) {
    return (
      <AccessDeniedRedirect studyId={studyId} message="접근 권한이 없습니다." />
    );
  }

  return (
    <main className="w-full flex-1 overflow-hidden p-5 pt-4 lg:p-8 lg:pt-4">
      <NoteTemplateUpdateEditor
        studyId={studyId}
        initialTemplate={study.templateContent ?? ''}
      />
    </main>
  );
};

export default SolutionNoteTemplatePage;
