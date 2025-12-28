import { type GetNoteDetailResponse } from '@/api/note/getNoteDetail/type';
import { TierBadge } from '@/components/common/TierBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/formatDate';
import Link from 'next/link';

import { NoteActionButtons } from './NoteActionButtons';

type Props = {
  studyId: number;
  username: string;
  note: GetNoteDetailResponse;
};

export const NoteDetailTitle = ({ studyId, username, note }: Props) => {
  const isWriter = username === note.username;

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-4xl font-bold">{note.problemTitle}</h1>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-muted-foreground flex flex-wrap gap-1">
            <span>{note.username}</span>
            <span>•</span>
            <span>{formatDate(note.updatedAt)}</span>
          </div>

          {isWriter && <NoteActionButtons studyId={studyId} noteId={note.id} />}
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
  );
};
