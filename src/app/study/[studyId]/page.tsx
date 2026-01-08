import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { DailyAssignmentsSection } from '@/features/study/components/main/DailyAssignmentsSection';
import { NotesSection } from '@/features/study/components/main/NotesSection';
import { safeParseInt } from '@/lib/parseParam';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
};

const StudyMainPage = async ({ params }: Props) => {
  const studyId = safeParseInt((await params).studyId);
  const study = await getStudyDetail(studyId);

  return (
    <main className="grid min-h-0 w-full flex-1 grid-cols-1 gap-10 p-5 pt-4 lg:h-screen lg:max-h-[calc(100dvh-4rem)] lg:grid-cols-2 lg:grid-rows-1 lg:gap-8 lg:p-8 lg:pt-4">
      <div className="flex min-h-0 flex-col gap-10 lg:h-full lg:gap-8">
        {/** 오늘의 추천 문제 리스트 섹션 */}
        <DailyAssignmentsSection study={study} />

        {/** 스터디 회원 목록 섹션 */}
        <DailyAssignmentsSection study={study} />
      </div>

      <div className="h-full min-h-0">
        {/** 풀이 노트 목록 섹션 */}
        <NotesSection study={study} />
      </div>
    </main>
  );
};

export default StudyMainPage;
