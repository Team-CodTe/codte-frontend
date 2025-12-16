import { StudiesSection } from '@/features/study/components/home/StudiesSection';
import { StudyHomeHeader } from '@/features/study/components/home/StudyHomeHeader';
import { StudyHomeTitle } from '@/features/study/components/home/StudyHomeTitle';
import { auth } from '@/lib/auth';

const StudyHomePage = async () => {
  const session = await auth();

  return (
    <div className="flex w-screen flex-col items-center">
      <StudyHomeHeader />

      <main className="flex w-full flex-col items-start gap-10 p-5 md:max-w-2xl md:gap-18 md:p-10 md:px-0">
        <StudyHomeTitle session={session} />
        <StudiesSection />
      </main>
    </div>
  );
};

export default StudyHomePage;
