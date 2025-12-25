'use client';

import { DynamicMarkdownEditor } from '@/components/common/MarkdownEditor';

import { useWriteNote } from '../../hooks/useWriteNote';

type Props = {
  studyId: number;
  problemId: number | null;
  initialContent: string;
};

export const NoteWriteEditor = ({
  studyId,
  problemId,
  initialContent,
}: Props) => {
  const { content, isDirty, isSubmitting, onChange, onSubmit, onReset } =
    useWriteNote({ studyId, problemId, initialContent });

  const onClickReset = () => {
    if (confirm('작성 중인 내용이 초기화됩니다. 계속하시겠습니까?')) {
      onReset();
    }
  };

  return (
    <div className="h-[calc(100dvh-6.25rem)] w-full overflow-hidden lg:h-[calc(100dvh-7rem)]">
      <DynamicMarkdownEditor
        value={content}
        onChange={onChange}
        placeholder="어떻게 문제를 풀었는지 기록해보세요."
        onSubmit={onSubmit}
        onReset={onClickReset}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      />
    </div>
  );
};
