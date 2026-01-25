'use client';

import '../styles/globals.css';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { PATH } from '@/constants/path';
import { useAuth } from '@/hooks/useAuth';
import {
  ArrowLeftIcon,
  HomeIcon,
  RefreshCcwIcon,
  SirenIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const SUPPORT_MAIL = 'team.codte@gmail.com';

const GlobalError = ({ error }: { error: Error & { digest?: string } }) => {
  const router = useRouter();
  const { handleLogout, isLoggingOut } = useAuth();

  const handleLogoutAndRedirect = async () => {
    try {
      await handleLogout();
      await signOut({ callbackUrl: PATH.LANDING });
    } catch (error) {
      console.error('❌ 로그아웃 처리 중 오류 발생', error);
    }
  };

  return (
    <html lang="ko">
      <body className="bg-background flex min-h-screen w-screen flex-col items-center justify-center gap-6 p-6">
        <div className="flex max-w-lg flex-col items-center justify-center gap-6">
          <SirenIcon className="text-destructive mx-auto size-16" />
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-5xl font-bold">Ooops!</h1>
            <p className="text-center text-xl font-semibold">
              문제가 발생했습니다
            </p>
            <p className="text-muted-foreground text-center text-sm leading-relaxed">
              아래 버튼을 이용해 주세요.
            </p>
          </div>
          <div className="flex w-full max-w-sm flex-col gap-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => {
                window.location.reload();
                router.refresh();
              }}>
              <RefreshCcwIcon />
              새로고침하기
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => router.back()}>
              <ArrowLeftIcon />
              뒤로가기
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleLogoutAndRedirect}
              disabled={isLoggingOut}>
              <HomeIcon />
              {isLoggingOut ? '이동 중...' : '로그인 페이지로 가기'}
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-muted-foreground mx-auto text-center text-sm leading-relaxed">
              문제가 계속된다면, 아래의 이메일로 문의해 주세요. 빠르게 해결해
              드리겠습니다.
            </p>
            <Button variant="link" className="text-muted-foreground" asChild>
              <a href={`mailto:${SUPPORT_MAIL}`}>{SUPPORT_MAIL}</a>
            </Button>
          </div>
        </div>

        {/* Development only */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <Card className="bg-muted max-w-2/3 text-left">
            <CardContent>
              <p className="mb-2">Error Details:</p>
              <p className="text-muted-foreground bg-background/50 rounded-sm border p-2 font-mono text-sm wrap-break-word">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-muted-foreground mt-2 font-mono text-sm">
                  Error ID: {error.digest}
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </body>
    </html>
  );
};

export default GlobalError;
