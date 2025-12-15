'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useExitStudy } from '@/features/study/hooks/useExitStudy';
import { cn } from '@/lib/utils';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';

type Props = {
  id: number;
};

export const StudyLeaveDialog = ({ id }: Props) => {
  const { mutateLeaveStudy, isLeavingStudy } = useExitStudy({ id });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">스터디 탈퇴</Button>
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
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: 'destructive' }))}
            onClick={() => mutateLeaveStudy()}>
            {isLeavingStudy ? <Spinner /> : null}
            {isLeavingStudy ? '탈퇴 중...' : '확인'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
