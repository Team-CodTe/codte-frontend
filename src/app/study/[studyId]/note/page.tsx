import { getStudyDetail } from '@/api/study/getStudyDetail/fetch';
import { NotesMaximizeSuspense } from '@/features/study/suspenses/NotesMaximizeSuspense';
import { safeParseInt } from '@/lib/parseParam';

type Props = {
  params: Promise<{
    studyId: string;
  }>;
};

const NotesPage = async ({ params }: Props) => {
  const studyId = safeParseInt((await params).studyId);
  const study = await getStudyDetail(studyId);

  return (
    <main className="min-h-0 w-full flex-1 overflow-y-auto">
      <div className="w-full flex-1 overflow-hidden p-5 pt-4 lg:p-8 lg:pt-4">
        <NotesMaximizeSuspense study={study} />
      </div>
    </main>
  );
};

export default NotesPage;
