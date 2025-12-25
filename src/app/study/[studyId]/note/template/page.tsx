import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { AccessDeniedRedirect } from '@/features/study/components/note/AccessDeniedRedirect';
import { NoteTemplateUpdateEditor } from '@/features/study/components/note/NoteTemplateUpdateEditor';
import { STUDY_ROLE } from '@/types/studyRole';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
};

const NoteTemplatePage = async ({ params }: Props) => {
  const { studyId } = await params;
  const studyIdNum = parseInt(studyId, 10);
  const study = await getStudyDetail(studyIdNum);

  if (study.myRole !== STUDY_ROLE.OWNER) {
    return (
      <AccessDeniedRedirect
        studyId={studyIdNum}
        message="접근 권한이 없습니다."
      />
    );
  }

  return (
    <main className="w-full flex-1 overflow-hidden p-5 pt-4 lg:p-8 lg:pt-4">
      <NoteTemplateUpdateEditor
        studyId={studyIdNum}
        initialTemplate={study.templateContent ?? ''}
      />
    </main>
  );
};

export default NoteTemplatePage;
