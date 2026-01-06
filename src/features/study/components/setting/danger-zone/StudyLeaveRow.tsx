'use client';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/Field';
import { Spinner } from '@/components/ui/Spinner';
import { useExitStudy } from '@/features/study/hooks/useExitStudy';

export const StudyLeaveRow = () => {
  const { mutateLeaveStudy, isLeavingStudy } = useExitStudy();

  const handleLeaveStudy = () => {
    if (!isLeavingStudy) {
      mutateLeaveStudy();
    }
  };

  return (
    <FieldGroup>
      <Field orientation="responsive">
        <FieldContent>
          <FieldLabel>스터디 탈퇴</FieldLabel>
          <FieldDescription>
            스터디를 탈퇴해도 다시 들어올 수 있습니다.
          </FieldDescription>
        </FieldContent>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-full md:w-auto">
              스터디 탈퇴
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>정말 스터디를 탈퇴하시겠습니까?</DialogTitle>
              <DialogDescription>
                스터디에서 탈퇴해도 다시 들어올 수 있지만, 반복적인 가입 및
                탈퇴는 스터디장에게 제재될 수 있습니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isLeavingStudy}>
                  취소
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleLeaveStudy}
                disabled={isLeavingStudy}>
                {isLeavingStudy ? <Spinner /> : null}
                {isLeavingStudy ? '탈퇴 중...' : '스터디 탈퇴'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Field>
    </FieldGroup>
  );
};
