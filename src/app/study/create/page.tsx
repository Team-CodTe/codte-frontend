import { CreateStudyForm } from '@/features/study/components/create/CreateStudyForm';

const CreateStudyPage = () => {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center p-5 md:p-10 md:px-0">
      <div className="flex w-full max-w-md">
        <CreateStudyForm />
      </div>
    </main>
  );
};

export default CreateStudyPage;
