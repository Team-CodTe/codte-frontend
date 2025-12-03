import { SignUpForm } from '@/features/sign-up/components/SignUpForm';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const SignUpPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const { user } = session;

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center px-5 py-10 md:p-12">
      <div className="flex w-full max-w-xs flex-col gap-12">
        <div className="leading-relaxed">
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-bold">처음 오셨네요! 반가워요</h2>
            <span className="font-toss-face text-xl">👋🏻</span>
          </div>
          <div className="text-muted-foreground">
            <span>서비스 이용을 위해 딱 두 가지만 알려주세요.</span>
          </div>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
