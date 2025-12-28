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
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Spinner } from '@/components/ui/Spinner';
import { PlusIcon } from 'lucide-react';

import { useAddAssignment } from '../../../hooks/useAddAssignment';

export const AssignmentAddDialog = () => {
  const {
    bojNumber,
    setBojNumber,
    open,
    handleOpenChange,
    onSubmit,
    canSubmit,
    isAdding,
  } = useAddAssignment();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <PlusIcon />
          <span className="hidden sm:inline">문제 직접 추가</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>문제 직접 추가</DialogTitle>
          <DialogDescription>
            백준 문제 번호를 입력해서 오늘의 추천 문제 리스트에 직접 추가할 수
            있어요. 추가된 문제는 강제 갱신해도 사라지지 않습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Label htmlFor="custom-assignment">문제 번호</Label>
          <Input
            id="custom-assignment"
            value={bojNumber}
            onChange={(e) => setBojNumber(e.target.value)}
            type="number"
            inputMode="numeric"
            placeholder="14501"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isAdding}>
              취소
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={!canSubmit || isAdding}
            onClick={onSubmit}>
            {isAdding ? <Spinner /> : null}
            {isAdding ? '추가 중...' : '추가'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
