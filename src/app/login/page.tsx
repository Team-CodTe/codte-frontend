import { AppLogo } from '@/components/logos/AppLogo';
import { Separator } from '@/components/ui/Separator';
import { GitHubLoginButton } from '@/features/login/components/GitHubLoginButton';
import { GoogleLoginButton } from '@/features/login/components/GoogleLoginButton';

const LoginPage = () => {
  return (
    <div className="bg-background flex min-h-screen w-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <AppLogo className="h-10 w-auto" />
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-center text-2xl font-bold">로그인</h1>
          <div className="flex w-full max-w-64 min-w-48 flex-col gap-2">
            <GoogleLoginButton />
            <GitHubLoginButton />
          </div>
          {/** @todo 도움받기 이메일 주소 추가 */}
          <div className="flex gap-1 text-center text-sm">
            도움이 필요하신가요?
            <a href="#" className="font-semibold">
              도움받기
            </a>
          </div>
          <Separator />
          {/** @todo 이용약관, 개인정보 처리방침 사이트 주소 추가 */}
          <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            로그인 시 <a href="#">서비스 이용약관</a> 및{' '}
            <a href="#">개인정보 처리방침</a>에 동의한 것으로 간주됩니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
