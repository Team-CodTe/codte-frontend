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
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Spinner } from '@/components/ui/Spinner';
import { useRemoveConfirmation } from '@/features/study/hooks/study/useRemoveConfirmation';

type Props = {
  studyName: string;
};

export const StudyRemoveRow = ({ studyName }: Props) => {
  const expectedText = `${studyName} 삭제`;

  const {
    confirmText,
    isConfirmValid,
    handleConfirmTextChange,
    handleChangeOpen,
    open,
    handleSubmit,
    isRemovingStudy,
  } = useRemoveConfirmation({ expectedText });

  return (
    <FieldGroup>
      <Field orientation="responsive">
        <FieldContent>
          <FieldLabel>스터디 삭제</FieldLabel>
          <FieldDescription>
            스터디를 삭제하면 모든 데이터가 영구적으로 사라집니다.
          </FieldDescription>
        </FieldContent>

        <AlertDialog open={open} onOpenChange={handleChangeOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">스터디 삭제</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                정말 스터디를 삭제하시겠습니까?
              </AlertDialogTitle>
              <AlertDialogDescription>
                이 작업은 되돌릴 수 없습니다. 스터디의 모든 데이터(추천 문제
                목록, 문제 풀이 글, 스터디 멤버 등)가{' '}
                <span className="text-destructive font-semibold">
                  영구적으로 삭제
                </span>
                됩니다.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex flex-col gap-3">
              <Label
                htmlFor="confirm-text"
                className="text-muted-foreground block text-sm">
                삭제를 확인하려면 아래에{' '}
                <span className="text-foreground font-semibold select-all">
                  {expectedText}
                </span>
                를 입력하세요.
              </Label>
              <Input
                id="confirm-text"
                value={confirmText}
                onChange={(e) => handleConfirmTextChange(e.target.value)}
                disabled={isRemovingStudy}
                placeholder={expectedText}
                className="font-medium"
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isRemovingStudy}>
                취소
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={!isConfirmValid || isRemovingStudy}
                onClick={handleSubmit}>
                {isRemovingStudy ? <Spinner className="mr-2" /> : null}
                {isRemovingStudy ? '삭제 중...' : '삭제하기'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Field>
    </FieldGroup>
  );
};
