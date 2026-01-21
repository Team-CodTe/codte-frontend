import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export const NoteDetailFallback = () => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-5 pt-4 pb-8 md:gap-12 md:pt-4 md:pb-16">
      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-10 w-3/4" />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1">
              <Skeleton className="h-6 w-12" />
              <span className="text-accent">•</span>
              <Skeleton className="h-6 w-48" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <CardTitle>AI 풀이 리뷰</CardTitle>
            <CardDescription>
              작성된 문제 풀이 글에 대해 생성된 AI 리뷰입니다.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-9 w-1/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
};
