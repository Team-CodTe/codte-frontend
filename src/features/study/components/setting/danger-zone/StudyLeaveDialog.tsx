'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button, buttonVariants } from '@/components/ui/Button_temp';
import { Spinner } from '@/components/ui/Spinner_temp';
import { useExitStudy } from '@/features/study/hooks/useExitStudy';
import { cn } from '@/lib/utils';

type Props = {
  studyId: number;
};

export const StudyLeaveDialog = ({ studyId }: Props) => {
  const { mutateLeaveStudy, isLeavingStudy } = useExitStudy({ studyId });

  const handleLeave = () => {
    if (!isLeavingStudy) {
      mutateLeaveStudy();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full md:w-auto">
          스터디 탈퇴
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 스터디를 탈퇴하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            스터디에서 탈퇴해도 다시 들어올 수 있지만, 반복적인 가입 및 탈퇴는
            스터디장에게 제재될 수 있습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLeavingStudy}>취소</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: 'destructive' }))}
            onClick={handleLeave}
            disabled={isLeavingStudy}>
            {isLeavingStudy ? <Spinner /> : null}
            {isLeavingStudy ? '탈퇴 중...' : '스터디 탈퇴'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
