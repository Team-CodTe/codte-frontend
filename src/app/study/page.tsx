import { StudyListSection } from '@/features/study/components/home/section/study-list/StudyListSection';
import { StudyHeader } from '@/features/study/components/home/StudyHeader';
import { auth } from '@/lib/auth';

const StudyListPage = async () => {
  const session = await auth();

  return (
    <div className="bg-background flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <StudyHeader session={session} />

      <div className="flex w-full flex-col items-start gap-12 p-5 md:max-w-3xl md:px-0 md:py-10">
        <div className="leading-relaxed">
          <div className="flex items-center gap-1 text-xl">
            <h2 className="font-bold">
              {session?.user.username}님, 안녕하세요
            </h2>
            <span className="font-toss-face">🙌🏻</span>
          </div>
          {/** @todo 가입된 스터디에 따라 문구 다르게 변경 */}
          <span className="text-muted-foreground text-lg font-semibold">
            아직 가입된 스터디가 없으시네요!
          </span>
        </div>

        <StudyListSection />
      </div>
    </div>
  );
};

export default StudyListPage;
