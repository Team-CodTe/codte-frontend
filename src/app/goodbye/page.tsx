import { Button } from '@/components/ui/Button';
import { PATH } from '@/constants/path';
import { GoodbyeHistoryBlocker } from '@/features/goodbye/components/GoodbyeHistoryBlocker';
import Link from 'next/link';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const GoodbyePage = async ({ searchParams }: Props) => {
  const { username } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <GoodbyeHistoryBlocker />

      <div className="flex max-w-lg flex-col items-center gap-8 text-center">
        <h1 className="text-3xl leading-tight font-bold sm:text-4xl">
          <span className="text-primary font-mono">System.exit(0);</span>
          <br />
          {username ? `${username}님,` : ''} 수고하셨습니다!
        </h1>

        <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
          CodTe에서의 프로세스는 종료되었지만,{' '}
          {username ? `${username}님의` : '당신의'} 코딩 라이프는 계속되길
          바랍니다. 언제든 다시 import가 필요하면 찾아주세요!
        </p>

        <Button asChild size="lg">
          <Link href={PATH.LANDING} replace>
            메인 페이지로
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default GoodbyePage;
