'use client';

import { type GetNoteDetailResponse } from '@/api/note/getNoteDetail/type';
import { TierBadge } from '@/components/common/TierBadge';
import { Badge } from '@/components/ui/Badge';
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
import { formatDate } from '@/lib/formatDate';
import Link from 'next/link';

import { useRemoveNote } from '../../hooks/useRemoveNote';

type Props = {
  studyId: number;
  username: string;
  note: GetNoteDetailResponse;
};

export const NoteDetailTitle = ({ studyId, username, note }: Props) => {
  const { onClick, isRemovingNote } = useRemoveNote({
    studyId,
    noteId: note.id,
  });

  const isWriter = username === note.username;

  return (
    <div className="flex flex-col items-start gap-6 leading-relaxed">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-4xl font-bold">{note.problemTitle}</h1>
        <div className="flex flex-row items-center justify-between">
          <div className="text-muted-foreground flex flex-wrap gap-2">
            <span>{note.username}</span>
            <span>•</span>
            <span>{formatDate(note.updatedAt)}</span>
          </div>

          {isWriter && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer hover:font-medium">
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
                      <Button variant="outline" disabled={isRemovingNote}>
                        취소
                      </Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      onClick={onClick}
                      disabled={isRemovingNote}>
                      {isRemovingNote ? <Spinner /> : null}
                      {isRemovingNote ? '삭제 중...' : '삭제'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge size="lg" variant="outline">
          <span>
            {formatDate(note.assignedDate, { includeTime: false })} 추천 문제
          </span>
        </Badge>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-2 rounded-full px-3 py-1 text-sm [&>svg]:size-4">
          <Link
            href={note.problemLink}
            target="_blank"
            rel="noreferrer"
            aria-label={`${note.problemBojNumber} 문제로 이동`}>
            <TierBadge size={10} level={note.problemBojTier} />
            <span>{note.problemBojNumber}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
