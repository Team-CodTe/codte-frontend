'use client';

import { DynamicMarkdownEditor } from '@/components/common/MarkdownEditor';

import { useUpdateNote } from '../../hooks/useEditNote';

type Props = {
  initialContent: string;
};

export const NoteUpdateEditor = ({ initialContent }: Props) => {
  const { content, isDirty, isSubmitting, onChange, onSubmit, onReset } =
    useUpdateNote({ initialContent });

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
        placeholder="풀이 노트를 수정하세요."
        onSubmit={onSubmit}
        onReset={onClickReset}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      />
    </div>
  );
};
