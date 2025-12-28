'use client';

import '../styles/globals.css';

import { useState } from 'react';

import { postLogout } from '@/api/auth/postLogout/post';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { PATH } from '@/constants/path';
import {
  ArrowLeftIcon,
  HomeIcon,
  RefreshCcwIcon,
  SirenIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const SUPPORT_MAIL = 'kdw34441360@gmail.com';

const GlobalError = ({ error }: { error: Error & { digest?: string } }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      // 백엔드 로그아웃 API 호출
      await postLogout();
    } catch (error) {
      console.error('❌ 로그아웃 처리 중 오류 발생', error);
    } finally {
      // 로그아웃 API 호출 성공 여부에 상관없이 NextAuth 세션 로그아웃
      await signOut({ callbackUrl: PATH.LANDING });
      setIsLoading(false);
    }
  };

  return (
    // NOTE: global-error must include html and body tags
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
              새로고침
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => router.back()}>
              <ArrowLeftIcon />
              뒤로
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleLogout}
              disabled={isLoading}>
              <HomeIcon />
              {isLoading ? '이동 중...' : '로그인 페이지로'}
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

        {/* Error Details (Development only) */}
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
