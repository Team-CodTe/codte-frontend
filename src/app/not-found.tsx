'use client';

import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon, SearchXIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="bg-background flex min-h-screen w-screen flex-col items-center justify-center gap-6 p-6">
      <div className="flex max-w-lg flex-col items-center justify-center gap-6">
        <SearchXIcon className="mx-auto size-16" />
        <h1 className="text-center text-5xl font-bold">404</h1>
        <div className="flex flex-col gap-2">
          <span className="text-center text-xl font-semibold">
            페이지를 찾을 수 없습니다
          </span>
          <span className="text-muted-foreground text-center text-sm">
            요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
            <br />
            URL을 다시 확인하거나 아래 버튼을 이용해 주세요.
          </span>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => router.back()}>
          <ArrowLeftIcon />
          뒤로
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
