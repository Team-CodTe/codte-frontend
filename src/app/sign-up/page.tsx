import { SignUpForm } from '@/features/sign-up/components/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center px-5 py-10 md:p-12">
      <div className="flex w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
