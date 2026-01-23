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
import { Button } from '@/components/ui/Button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/Field';
import { Spinner } from '@/components/ui/Spinner';
import { useExitStudy } from '@/features/study/hooks/study/useExitStudy';

export const StudyLeaveRow = () => {
  const { handleLeave, isLeavingStudy } = useExitStudy();

  return (
    <FieldGroup>
      <Field orientation="responsive">
        <FieldContent>
          <FieldLabel>스터디 탈퇴</FieldLabel>
          <FieldDescription>
            데이터는 보존되며, 언제든 다시 가입할 수 있습니다.
          </FieldDescription>
        </FieldContent>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full md:w-auto">
              스터디 탈퇴
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                정말 스터디를 탈퇴하시겠습니까?
              </AlertDialogTitle>
              <AlertDialogDescription>
                탈퇴하더라도 기존 활동 내역과 데이터는 삭제되지 않습니다.
                재가입은 가능하지만,{' '}
                <span className="text-foreground font-semibold">
                  잦은 탈퇴와 가입 반복 시 제재 사유
                </span>
                가 될 수 있습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLeavingStudy}>
                취소
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={handleLeave}
                disabled={isLeavingStudy}>
                {isLeavingStudy ? <Spinner /> : null}
                {isLeavingStudy ? '탈퇴 중...' : '탈퇴하기'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Field>
    </FieldGroup>
  );
};
