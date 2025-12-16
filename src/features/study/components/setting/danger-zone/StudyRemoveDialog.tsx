'use client';

import { useState } from 'react';

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
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Spinner } from '@/components/ui/Spinner_temp';
import { cn } from '@/lib/utils';

import { useExitStudy } from '../../../hooks/useExitStudy';
import { useRemoveConfirmation } from '../../../hooks/useRemoveStudyForm';

type Props = {
  studyId: number;
  studyName: string;
};

export const StudyRemoveDialog = ({ studyId, studyName }: Props) => {
  const [open, setOpen] = useState(false);
  const {
    confirmText,
    expectedText,
    isConfirmValid,
    handleConfirmTextChange,
    resetForm,
  } = useRemoveConfirmation({ studyName });
  const { mutateRemoveStudy, isRemovingStudy } = useExitStudy({ studyId });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      resetForm();
    }
  };

  const handleRemove = () => {
    if (isConfirmValid) {
      mutateRemoveStudy();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild className="w-full md:w-auto">
        <Button variant="destructive">스터디 삭제</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 스터디를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            스터디를 삭제하면 모든 스터디 정보가 삭제되고, 복구할 수 없습니다.
            스터디 삭제를 원하시면 아래 문구를 입력해주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col items-center gap-3">
          <Label htmlFor="confirmText">{expectedText}</Label>
          <Input
            value={confirmText}
            onChange={(e) => handleConfirmTextChange(e.target.value)}
            disabled={isRemovingStudy}
            placeholder="여기에 문구 입력"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={!isConfirmValid || isRemovingStudy}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: 'destructive' }))}
            disabled={!isConfirmValid || isRemovingStudy}
            onClick={handleRemove}>
            {isRemovingStudy ? <Spinner /> : null}
            {isRemovingStudy ? '삭제 중...' : '스터디 삭제'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
