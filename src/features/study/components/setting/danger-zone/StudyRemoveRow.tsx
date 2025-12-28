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
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Spinner } from '@/components/ui/Spinner';
import { useRemoveConfirmation } from '@/features/study/hooks/useRemoveConfirmation';

type Props = {
  studyName: string;
};

export const StudyRemoveRow = ({ studyName }: Props) => {
  const expectedText = `${studyName} 삭제`;

  const {
    confirmText,
    isConfirmValid,
    handleConfirmTextChange,
    handleOpenChange,
    open,
    onSubmit,
    isRemovingStudy,
  } = useRemoveConfirmation({ expectedText });

  return (
    <FieldGroup>
      <Field orientation="responsive">
        <FieldContent>
          <FieldLabel>스터디 삭제</FieldLabel>
          <FieldDescription>
            스터디를 삭제하면 다시 복구할 수 없습니다.
          </FieldDescription>
        </FieldContent>

        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button variant="destructive">스터디 삭제</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>정말 스터디를 삭제하시겠습니까?</DialogTitle>
              <DialogDescription>
                스터디를 삭제하면 모든 스터디 정보가 삭제되고, 복구할 수
                없습니다. 스터디 삭제를 원하시면 아래 문구를 입력해주세요.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-3">
              <Label htmlFor="confirmText">{expectedText}</Label>
              <Input
                value={confirmText}
                onChange={(e) => handleConfirmTextChange(e.target.value)}
                disabled={isRemovingStudy}
                placeholder="여기에 문구 입력"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isRemovingStudy}>
                  취소
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                disabled={!isConfirmValid || isRemovingStudy}
                onClick={onSubmit}>
                {isRemovingStudy ? <Spinner /> : null}
                {isRemovingStudy ? '삭제 중...' : '스터디 삭제'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Field>
    </FieldGroup>
  );
};
