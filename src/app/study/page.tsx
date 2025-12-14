import { StudiesSection } from '@/features/study/components/home/section/studies/StudiesSection';
import { StudyHomeHeader } from '@/features/study/components/home/StudyHomeHeader';
import { StudyHomeTitle } from '@/features/study/components/home/StudyHomeTitle';
import { auth } from '@/lib/auth';

const StudyHomePage = async () => {
  const session = await auth();

  return (
    <div className="flex w-screen flex-col items-center">
      <StudyHomeHeader />

      <main className="flex w-full flex-col items-start gap-18 px-5 py-10 md:max-w-3xl md:p-12">
        <StudyHomeTitle session={session} />

        <StudiesSection />
      </main>
    </div>
  );
};

export default StudyHomePage;
