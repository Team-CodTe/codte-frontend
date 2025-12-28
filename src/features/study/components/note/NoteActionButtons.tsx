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
import { Spinner } from '@/components/ui/Spinner';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { useRouter } from 'next/navigation';

import { useRemoveNote } from '../../hooks/useRemoveNote';

type Props = {
  studyId: number;
  noteId: number;
};

export const NoteActionButtons = ({ studyId, noteId }: Props) => {
  const router = useRouter();

  const { handleRemove, isRemoving } = useRemoveNote({
    studyId,
    noteId,
  });

  const handleUpdate = () => {
    router.push(
      buildUrlWithParams({
        url: PATH.STUDY.NOTE.EDIT,
        pathParams: { studyId, noteId },
      }),
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer hover:font-medium"
        onClick={handleUpdate}>
        수정
      </button>

      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="text-muted-foreground hover:text-destructive transition-colors hover:cursor-pointer hover:font-medium">
            삭제
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
            <DialogDescription>
              문제 풀이 글을 삭제하면 다시 복구할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isRemoving}>
                취소
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleRemove}
              disabled={isRemoving}>
              {isRemoving ? <Spinner /> : null}
              {isRemoving ? '삭제 중...' : '삭제'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
