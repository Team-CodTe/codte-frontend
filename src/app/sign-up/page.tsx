import { Button } from '@/components/ui/Button';
import { LogoutButton } from '@/features/sign-up/components/LogoutButton';
import { TestAuthCard } from '@/features/sign-up/components/test/TestAuthCard';
import { AuthTestLogger } from '@/features/sign-up/components/test/TestAuthLogger';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const SignUpPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const { user, provider, accessToken } = session;

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-6 p-5 md:p-5">
      <div className="w-full max-w-xs space-y-6">
        <div className="flex flex-col items-start leading-relaxed">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">안녕하세요! {user?.name}님 </h2>
            <span className="font-toss-face text-xl">👋🏻</span>
          </div>
          <div className="text-muted-foreground">
            <span>서비스 이용을 위해 딱 두 가지만 알려주세요.</span>
          </div>
        </div>

        {/** @todo 회원가입 폼(닉네임, 백준 계정) 추가 */}
        <></>

        <div className="flex flex-col gap-2">
          <Button className="w-full">회원가입</Button>
          <LogoutButton />
        </div>
      </div>

      {/** 로그인 완료 테스트 카드 - 개발 환경에서만 표시 */}
      {process.env.NODE_ENV === 'development' && (
        <div>
          <TestAuthCard
            user={{
              name: user?.name || '',
              email: user?.email || '',
              image: user?.image || '',
            }}
            provider={provider || ''}
            accessToken={accessToken || ''}
          />
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
