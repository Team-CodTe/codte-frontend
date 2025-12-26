import { type GetNoteDetailResponse } from '@/api/note/getNoteDetail/type';
import { TierBadge } from '@/components/common/TierBadge';
import { formatDate } from '@/lib/formatDate';
import {
  CalendarCheck2Icon,
  CalendarSearchIcon,
  CodeXmlIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';

type Props = {
  note: GetNoteDetailResponse;
};

export const NoteDetailTitle = ({ note }: Props) => {
  return (
    <div className="flex flex-col items-start gap-1 leading-relaxed">
      <h1 className="mb-3 text-3xl font-bold">{note.problemTitle}</h1>

      <div className="flex flex-row items-start">
        <div className="text-muted-foreground flex w-36 min-w-32 flex-row items-center gap-2 font-medium">
          <CalendarSearchIcon className="size-3" />
          <span>문제 추천 날짜</span>
        </div>
        <span>{formatDate(note.assignedDate, { includeTime: false })}</span>
      </div>

      <div className="flex flex-row items-start">
        <div className="text-muted-foreground flex w-36 min-w-32 flex-row items-center gap-2 font-medium">
          <CodeXmlIcon className="size-3.5" />
          <span>문제 번호</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <TierBadge level={note.problemBojTier} />
          <Link
            id={note.problemBojNumber.toString()}
            aria-label={`${note.problemBojNumber} 문제로 이동`}
            href={note.problemLink}
            target="_blank"
            rel="noreferrer"
            className="hover:underline">
            {note.problemBojNumber}
          </Link>
        </div>
      </div>

      <div className="flex flex-row items-start">
        <div className="text-muted-foreground flex w-36 min-w-32 flex-row items-center gap-2 font-medium">
          <UserIcon className="size-3.5" />
          <span>작성자</span>
        </div>
        <span>{note.username}</span>
      </div>

      <div className="flex flex-row items-start">
        <div className="text-muted-foreground flex w-36 min-w-32 flex-row items-center gap-2 font-medium">
          <CalendarCheck2Icon className="size-3.5" />
          <span>작성일</span>
        </div>
        <span>{formatDate(note.createdAt)}</span>
      </div>
    </div>
  );
};
