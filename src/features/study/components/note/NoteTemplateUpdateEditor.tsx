'use client';

import { DynamicMarkdownEditor } from '@/components/common/MarkdownEditor';

import { useUpdateNoteTemplate } from '../../hooks/useUpdateNoteTemplate';

type Props = {
  initialTemplate: string;
};

export const NoteTemplateUpdateEditor = ({ initialTemplate }: Props) => {
  const {
    templateContent,
    isDirty,
    isSubmitting,
    onChange,
    onSubmit,
    onReset,
  } = useUpdateNoteTemplate({ initialTemplate });

  const onClickReset = () => {
    if (confirm('작성 중인 내용이 초기화됩니다. 계속하시겠습니까?')) {
      onReset();
    }
  };

  return (
    <div className="h-[calc(100dvh-6.25rem)] w-full overflow-hidden lg:h-[calc(100dvh-7rem)]">
      <DynamicMarkdownEditor
        value={templateContent}
        onChange={onChange}
        placeholder="풀이 노트 템플릿을 작성해보세요."
        onSubmit={onSubmit}
        onReset={onClickReset}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      />
    </div>
  );
};
