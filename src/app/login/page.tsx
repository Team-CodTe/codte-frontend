import { AppLogo } from '@/components/logos/AppLogo';
import { LoginButtons } from '@/features/login/components/LoginButtons';
import { LoginFooter } from '@/features/login/components/LoginFooter';

const LoginPage = () => {
  return (
    <div className="bg-background flex min-h-screen w-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center gap-8">
          <AppLogo className="h-10 w-auto" />
          <div className="flex w-full flex-col items-center gap-4">
            <span className="text-muted-foreground text-center font-medium">
              로그인할 계정을 선택해주세요
            </span>
            <LoginButtons />
          </div>
          <LoginFooter />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
