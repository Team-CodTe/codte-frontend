import { StudiesSection } from '@/features/study/components/home/section/studies/StudiesSection';
import { StudyHomeHeader } from '@/features/study/components/home/StudyHomeHeader';
import { StudyHomeTitle } from '@/features/study/components/home/StudyHomeTitle';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const StudyHomePage = async () => {
  const session = await auth();

  return (
    <div className="bg-background flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <StudyHomeHeader />

      <div className="flex w-full flex-col items-start gap-12 p-5 md:max-w-3xl md:px-0 md:py-10">
        <StudyHomeTitle session={session} />
        <StudiesSection />
      </div>
    </div>
  );
};

export default StudyHomePage;
