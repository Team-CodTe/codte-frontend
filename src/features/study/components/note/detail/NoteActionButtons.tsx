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
import { Spinner } from '@/components/ui/Spinner';
import { PATH } from '@/constants/path';
import { useRemoveNote } from '@/features/study/hooks/note/useRemoveNote';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { useRouter } from 'next/navigation';

type Props = {
  studyId: number;
  noteId: number;
};

export const NoteActionButtons = ({ studyId, noteId }: Props) => {
  const router = useRouter();
  const { handleRemove, isRemoving } = useRemoveNote();

  const moveToEditNote = () => {
    router.push(
      buildUrlWithParams({
        url: PATH.STUDY.NOTES.EDIT,
        pathParams: { studyId, noteId },
      }),
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer hover:font-medium"
        onClick={moveToEditNote}>
        수정
      </button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            className="text-muted-foreground hover:text-destructive transition-colors hover:cursor-pointer hover:font-medium">
            삭제
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              문제 풀이 글을 삭제하면 다시 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>취소</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleRemove}
              disabled={isRemoving}>
              {isRemoving ? <Spinner /> : null}
              {isRemoving ? '삭제하는 중...' : '삭제하기'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
