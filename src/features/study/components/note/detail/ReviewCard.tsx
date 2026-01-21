'use client';

import { DynamicMarkdownPreview } from '@/components/common/MarkdownPreview';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Spinner } from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';
import { InfoIcon, SparklesIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type Props = {
  reviewContent: string | null;
  isWriter: boolean;
  isPending: boolean;
  onCreateReview: () => void;
};

export const ReviewCard = ({
  reviewContent,
  isWriter,
  isPending,
  onCreateReview,
}: Props) => {
  const hasReview = !!reviewContent;

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-col gap-2">
          <CardTitle>AI 풀이 리뷰</CardTitle>
          <CardDescription>
            AI가 작성된 풀이를 분석하여 코드의 개선점과 최적화 방안을
            제안합니다.
          </CardDescription>
        </div>
        {isWriter && (
          <Button
            size="sm"
            variant={hasReview ? 'outline' : 'default'}
            disabled={isPending}
            onClick={onCreateReview}>
            {isPending ? (
              <Spinner />
            ) : (
              <SparklesIcon
                className={cn(
                  'text-primary-foreground',
                  hasReview && 'text-muted-foreground',
                )}
                fill="currentColor"
              />
            )}
            <span>
              {isPending
                ? '리뷰 작성 중...'
                : hasReview
                  ? '다시 리뷰 요청하기'
                  : 'AI 리뷰 요청하기'}
            </span>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div key="loading" {...fadeAnimation}>
                <div className="flex flex-col gap-3">
                  <span className="text-muted-foreground mb-2 flex animate-pulse items-center text-sm font-medium">
                    AI가 코드를 분석하고 리뷰를 작성하고 있습니다...
                  </span>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </motion.div>
            ) : reviewContent ? (
              <motion.div key="content" {...fadeAnimation}>
                <DynamicMarkdownPreview value={reviewContent} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                {...fadeAnimation}
                className="flex flex-row items-center justify-between text-sm">
                <div>
                  아직 생성된 리뷰가 없습니다. 버튼을 눌러 AI의 피드백을
                  받아보세요!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>

      <CardFooter>
        <div className="text-muted-foreground bg-muted flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs">
          <InfoIcon className="size-3 shrink-0" />
          <span>
            AI 생성 답변은 부정확할 수 있습니다. 제출된 코드는 AI 학습 및 품질
            개선에 사용될 수 있으므로 민감한 정보 입력에 주의하세요.
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
