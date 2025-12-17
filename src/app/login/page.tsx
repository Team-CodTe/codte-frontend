import { AppLogo } from '@/components/logos/AppLogo';
import { LoginButtons } from '@/features/login/components/LoginButtons';
import { LoginFooter } from '@/features/login/components/LoginFooter';
import { LoginSessionHandler } from '@/features/login/components/LoginSessionHandler';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const LoginPage = async ({ searchParams }: Props) => {
  const { expired } = await searchParams;
  const isExpired = expired === 'true';

  return (
    <main className="bg-background flex min-h-screen w-screen flex-col items-center justify-center p-5 md:p-8">
      <LoginSessionHandler isExpired={isExpired} />

      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center gap-8">
          <AppLogo className="h-10 w-auto" />
          <div className="flex w-full flex-col items-center gap-4">
            <div className="text-center leading-relaxed">
              <h2 className="text-xl font-semibold">로그인</h2>
              <span className="text-muted-foreground text-center font-medium">
                로그인할 계정을 선택해주세요
              </span>
            </div>
            <LoginButtons />
          </div>
          <LoginFooter />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
