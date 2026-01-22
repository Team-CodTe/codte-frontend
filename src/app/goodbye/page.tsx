import { GoodbyeCommentSection } from '@/features/goodbye/components/GoodbyeCommentSection';
import { GoodbyeHistoryBlocker } from '@/features/goodbye/components/GoodbyeHistoryBlocker';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const GoodbyePage = async ({ searchParams }: Props) => {
  const { username } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <GoodbyeHistoryBlocker />
      <GoodbyeCommentSection username={username as string} />
    </main>
  );
};

export default GoodbyePage;
