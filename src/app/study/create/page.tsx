import { CreateStudyForm } from '@/features/study/components/create/CreateStudyForm';

const CreateStudyPage = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center px-5 py-10 md:p-12">
      <div className="flex w-full max-w-md">
        <CreateStudyForm />
      </div>
    </div>
  );
};

export default CreateStudyPage;
