'use client';

import { DynamicMarkdownEditor } from '@/components/common/MarkdownEditor';

import { useUpdateStudyTemplate } from '../../hooks/useUpdateStudyTemplate';

type Props = {
  studyId: number;
  initialTemplate: string;
};

export const StudyTemplateUpdateEditor = ({
  studyId,
  initialTemplate,
}: Props) => {
  const { content, isDirty, isSubmitting, onChange, onSubmit, onReset } =
    useUpdateStudyTemplate({ studyId, initialTemplate });

  return (
    <div className="h-[calc(100dvh-5.25rem)] w-full overflow-hidden lg:h-[calc(100dvh-6rem)]">
      <DynamicMarkdownEditor
        value={content}
        onChange={onChange}
        placeholder="풀이 노트 템플릿을 작성해보세요."
        onSubmit={onSubmit}
        onReset={onReset}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      />
    </div>
  );
};
