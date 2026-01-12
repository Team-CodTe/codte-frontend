import { JoinStudyForm } from '@/features/study/components/join/JoinStudyForm';

const StudyJoinPage = () => {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center p-5 md:p-10 md:px-0">
      <div className="flex w-full max-w-md">
        <JoinStudyForm />
      </div>
    </main>
  );
};

export default StudyJoinPage;
