import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { DailyAssignmentsSection } from '@/features/study/components/main/DailyAssignmentsSection';
import { SolutionNotesSection } from '@/features/study/components/main/SolutionNotesSection';

type Props = {
  params: Promise<{
    studyId: number;
  }>;
};

const StudyMainPage = async ({ params }: Props) => {
  const { studyId } = await params;
  const study = await getStudyDetail(studyId);

  return (
    <main className="grid min-h-0 w-full flex-1 grid-cols-1 gap-10 p-5 pt-4 lg:grid-cols-2 lg:grid-rows-1 lg:gap-8 lg:p-8 lg:pt-4">
      <div className="flex min-h-0 flex-col gap-10 lg:h-full lg:gap-8">
        {/** 오늘의 추천 문제 리스트 섹션 */}
        <DailyAssignmentsSection study={study} />

        {/** 스터디 회원 목록 섹션 */}
      </div>

      <div className="h-full min-h-0">
        {/** 풀이 노트 목록 섹션 */}
        <SolutionNotesSection study={study} />
      </div>
    </main>
  );
};

export default StudyMainPage;
