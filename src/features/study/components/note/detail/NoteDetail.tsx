'use client';

import { useNoteDetailQuery } from '@/api/note/getNoteDetail/query';
import { type GetNoteDetailResponse } from '@/api/note/getNoteDetail/type';
import { useMyProfileQuery } from '@/api/user/getMyProfile/query';
import { type GetMyProfileResponse } from '@/api/user/getMyProfile/type';
import { DynamicMarkdownPreview } from '@/components/common/MarkdownPreview';
import { TierBadge } from '@/components/common/TierBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/formatFunc';
import Link from 'next/link';

import { NoteActionButtons } from './NoteActionButtons';

type Props = {
  studyId: number;
  initialUser: GetMyProfileResponse;
  initialNote: GetNoteDetailResponse;
};

export const NoteDetail = ({ studyId, initialUser, initialNote }: Props) => {
  const { data: note } = useNoteDetailQuery(initialNote.id, {
    initialData: initialNote,
  });
  const { data: user } = useMyProfileQuery({
    initialData: initialUser,
  });

  if (!note || !user) {
    return null;
  }

  const isWriter = user.username === initialNote.username;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-5 pt-4 pb-8 md:gap-16 md:pt-4 md:pb-16">
      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-4xl font-bold">{note.problemTitle}</h1>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-muted-foreground flex flex-wrap gap-1">
              <span>{note.username}</span>
              <span>•</span>
              <span>
                {formatDate(note.createdAt)}
                {note.isUpdated ? ` (${formatDate(note.updatedAt)} 수정)` : ''}
              </span>
            </div>

            {isWriter && (
              <NoteActionButtons studyId={studyId} noteId={note.id} />
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge size="lg" variant="secondary">
            <span>
              {formatDate(note.assignedDate, { includeTime: false })} 추천 문제
            </span>
          </Badge>
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="gap-2 rounded-lg px-3 py-0.5 text-sm [&>svg]:size-4">
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

      <DynamicMarkdownPreview value={note.content} />
    </div>
  );
};
