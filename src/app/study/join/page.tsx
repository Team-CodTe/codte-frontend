import { JoinStudyForm } from '@/features/study/components/join/JoinStudyForm';

const JoinStudyPage = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center px-5 py-10 md:p-12">
      <div className="flex w-full max-w-md">
        <JoinStudyForm />
      </div>
    </div>
  );
};

export default JoinStudyPage;
