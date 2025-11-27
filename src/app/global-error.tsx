'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { RefreshCcwIcon, SirenIcon } from 'lucide-react';

const SUPPORT_MAIL = 'kdw34441360@gmail.com';

const GlobalError = ({ error }: { error: Error & { digest?: string } }) => {
  return (
    // NOTE: global-error must include html and body tags
    <html lang="ko">
      <body className="bg-background flex min-h-screen w-screen flex-col items-center justify-center gap-6 p-6">
        <div className="flex max-w-lg flex-col items-center justify-center gap-6">
          <SirenIcon className="text-destructive mx-auto size-16" />
          <h1 className="text-center text-5xl font-bold">Ooops!</h1>
          <p className="text-center text-xl font-semibold">
            문제가 발생했습니다
          </p>
          <p className="text-muted-foreground text-center text-sm leading-relaxed">
            페이지를 새로고침 하거나 잠시 후 다시 시도해 주세요.
          </p>
          <div className="flex w-full max-w-sm flex-col gap-3">
            {/** @TODO 로그아웃 버튼 기능 추가 */}
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => {
                window.location.reload();
              }}>
              <RefreshCcwIcon />
              다시 시도하기
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
