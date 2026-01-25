'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Spinner } from '@/components/ui/Spinner';
import { PlusIcon } from 'lucide-react';

import { useAddAssignment } from '../../../hooks/assignment/useAddAssignment';

export const AssignmentAddDialog = () => {
  const {
    bojNumber,
    setBojNumber,
    open,
    handleChangeOpen,
    handleSubmit,
    canSubmit,
    isAdding,
  } = useAddAssignment();

  return (
    <AlertDialog open={open} onOpenChange={handleChangeOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" size="icon-sm-responsive">
          <PlusIcon />
          <span className="hidden sm:inline">문제 직접 추가</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>문제 직접 추가하기</AlertDialogTitle>
          <AlertDialogDescription>
            함께 풀고 싶은 백준 문제의 번호를 입력하여 오늘의 추천 문제에
            추가해보세요. 직접 추가한 문제는 추천 문제를 변경해도 유지됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-3">
          <Label htmlFor="custom-assignment">백준 문제 번호</Label>
          <Input
            id="custom-assignment"
            value={bojNumber}
            onChange={(e) => setBojNumber(e.target.value)}
            type="number"
            inputMode="numeric"
            placeholder="예시) 1000"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isAdding}>취소</AlertDialogCancel>
          <Button
            type="submit"
            disabled={!canSubmit || isAdding}
            onClick={handleSubmit}>
            {isAdding ? <Spinner /> : null}
            {isAdding ? '추가하는 중...' : '추가하기'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
