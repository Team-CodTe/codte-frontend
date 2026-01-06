import type { GetStudyDetailResponse } from '@/api/study/getStudyDetail/type';

import { NotesSuspense } from '../../suspenses/NotesSuspense';
import { NotesTableHeader } from './notes/NotesTableHeader';

type Props = {
  study: GetStudyDetailResponse;
};

export const NotesSection = ({ study }: Props) => {
  return (
    <div className="flex h-full flex-col gap-3">
      <NotesTableHeader studyId={study.id} role={study.myRole} />
      <NotesSuspense studyId={study.id} pageSize={30} />
    </div>
  );
};
