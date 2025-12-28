import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { AccessDeniedRedirect } from '@/features/study/components/note/AccessDeniedRedirect';
import { NoteTemplateUpdateEditor } from '@/features/study/components/note/NoteTemplateUpdateEditor';
import { safeParseInt } from '@/lib/parseParam';
import { STUDY_ROLE } from '@/types/studyRole';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
};

const NoteTemplatePage = async ({ params }: Props) => {
  const studyId = safeParseInt((await params).studyId);
  const study = await getStudyDetail(studyId);

  if (study.myRole !== STUDY_ROLE.OWNER) {
    return <AccessDeniedRedirect message="접근 권한이 없습니다." />;
  }

  return (
    <main className="w-full flex-1 overflow-hidden p-5 pt-4 lg:p-8 lg:pt-4">
      <NoteTemplateUpdateEditor initialTemplate={study.templateContent ?? ''} />
    </main>
  );
};

export default NoteTemplatePage;
