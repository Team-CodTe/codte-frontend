import { StudyHeader } from '@/features/study/components/StudyHeader';
import { auth } from '@/lib/auth';

const StudyListPage = async () => {
  const session = await auth();

  return (
    <div className="bg-background flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <StudyHeader session={session} />
    </div>
  );
};

export default StudyListPage;
