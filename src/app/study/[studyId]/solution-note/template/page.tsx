import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';

type Props = {
  params: Promise<{
    studyId: number;
  }>;
};

const SolutionNoteTemplatePage = async ({ params }: Props) => {
  const { studyId } = await params;
  const study = await getStudyDetail(studyId);

  return <div>문제 풀이 템플릿 페이지 ({study.templateContent})</div>;
};

export default SolutionNoteTemplatePage;
