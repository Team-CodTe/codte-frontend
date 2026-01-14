import { VIEW_METHOD } from '@/api/solve-status/getSolveStatus/type';
import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { DailyAssignmentsSection } from '@/features/study/components/main/DailyAssignmentsSection';
import { NotesSection } from '@/features/study/components/main/NotesSection';
import { SolveStatusSection } from '@/features/study/components/main/SolveStatusSection';
import { safeParseInt } from '@/lib/parseParam';
import { z } from 'zod';

const viewSchema = z
  .enum([VIEW_METHOD.ME, VIEW_METHOD.GROUP])
  .catch(VIEW_METHOD.GROUP);

type Props = {
  params: Promise<{
    studyId: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const StudySpacePage = async ({ params, searchParams }: Props) => {
  const studyId = safeParseInt((await params).studyId);
  const study = await getStudyDetail(studyId);
  const { view } = await searchParams;
  const viewParam = viewSchema.parse(view);

  return (
    <main className="grid min-h-0 w-full flex-1 grid-cols-1 gap-10 p-5 pt-4 lg:h-screen lg:max-h-[calc(100dvh-4rem)] lg:grid-cols-2 lg:grid-rows-1 lg:gap-8 lg:p-8 lg:pt-4">
      <div className="flex min-h-0 flex-col gap-10 lg:h-full lg:gap-6">
        {/** 오늘의 추천 문제 섹션 */}
        <DailyAssignmentsSection study={study} />

        {/** 문제 풀이 상태 섹션 */}
        <SolveStatusSection study={study} view={viewParam} />
      </div>

      <div className="h-full min-h-0">
        {/** 문제 풀이 글 섹션 */}
        <NotesSection study={study} />
      </div>
    </main>
  );
};

export default StudySpacePage;
