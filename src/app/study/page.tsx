import { StudiesSection } from '@/features/study/components/home/section/studies/StudiesSection';
import { StudyHeader } from '@/features/study/components/home/StudyHeader';
import { auth } from '@/lib/auth';

const StudyHomePage = async () => {
  const session = await auth();

  return (
    <div className="bg-background flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <StudyHeader session={session} />

      <div className="flex w-full flex-col items-start gap-12 p-5 md:max-w-3xl md:px-0 md:py-10">
        <div className="leading-relaxed">
          <div className="flex items-center gap-1 text-xl">
            <h2 className="font-bold">
              {session?.user?.username ?? '사용자'}님, 안녕하세요
            </h2>
            <span className="font-toss-face">🙌🏻</span>
          </div>
          <span className="text-muted-foreground font-semibold">
            오늘도 한 걸음 나아가는 모습, 멋있어요!
          </span>
        </div>

        <StudiesSection />
      </div>
    </div>
  );
};

export default StudyHomePage;
