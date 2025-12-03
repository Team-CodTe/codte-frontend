import { AppLogo } from '@/components/logos/AppLogo';
import { LoginButtons } from '@/features/login/components/LoginButtons';
import { LoginFooter } from '@/features/login/components/LoginFooter';

const LoginPage = () => {
  return (
    <div className="bg-background flex min-h-screen w-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <AppLogo className="h-10 w-auto" />
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-center text-2xl font-bold">로그인</h1>
          <LoginButtons />
          <LoginFooter />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
