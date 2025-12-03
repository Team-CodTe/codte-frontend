import { Button } from '@/components/ui/Button';
import { StudyHeader } from '@/features/study/components/StudyHeader';
import { auth } from '@/lib/auth';
import {
  GitPullRequestArrowIcon,
  NotebookPenIcon,
  PlusIcon,
} from 'lucide-react';

const StudyListPage = async () => {
  const session = await auth();

  return (
    <div className="bg-background flex min-h-screen flex-col items-center lg:h-screen lg:overflow-hidden">
      <StudyHeader session={session} />
      <div className="flex w-full flex-col items-start gap-12 p-5 md:max-w-xl md:px-0 md:py-10">
        <div className="leading-relaxed">
          <div className="flex items-center gap-1 text-xl">
            <h2 className="font-bold">
              {session?.user.username}님, 안녕하세요
            </h2>
            <span className="font-toss-face">🙌🏻</span>
          </div>
          {/** @todo 가입된 스터디에 따라 문구 다르게 변경 */}
          <span className="text-muted-foreground text-lg font-semibold">
            아직 가입된 스터디가 없으시네요!
          </span>
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full flex-row items-center justify-between gap-3">
            <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
              <NotebookPenIcon className="size-3.5" />
              <span>내 스터디</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <PlusIcon />
                <span className="hidden sm:inline">새로 만들기</span>
              </Button>
              <Button variant="outline" size="sm">
                <GitPullRequestArrowIcon />
                <span className="hidden sm:inline">들어가기</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyListPage;
