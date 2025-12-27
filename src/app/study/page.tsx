import { getMyProfile } from '@/api/user/getMyProfile/fetch';
import { StudiesSection } from '@/features/study/components/home/StudiesSection';
import { StudyHomeHeader } from '@/features/study/components/home/StudyHomeHeader';
import { StudyHomeTitle } from '@/features/study/components/home/StudyHomeTitle';

const StudyHomePage = async () => {
  const user = await getMyProfile();

  return (
    <div className="flex w-screen flex-col items-center">
      <StudyHomeHeader />

      <main className="flex w-full flex-col items-start gap-8 p-5 pt-4 pb-8 md:max-w-2xl md:gap-16 md:px-0 md:pt-4 md:pb-16">
        <StudyHomeTitle user={user} />
        <StudiesSection />
      </main>
    </div>
  );
};

export default StudyHomePage;
