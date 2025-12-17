'use client';

import { useEffect, useRef, useState } from 'react';

import { useUpdateStudyMutation } from '@/api/study/patchUpdateStudy/mutation';
import { Spinner } from '@/components/ui/Spinner';
import { useDebounce } from '@/hooks/useDebounce';
import { showToast } from '@/lib/showToast';
import { type MDXEditorMethods } from '@mdxeditor/editor';

import { BaseEditor } from './BaseEditor';

type Props = {
  studyId: number;
  initialTemplate: string;
};

export const StudyTemplateUpdateEditor = ({
  studyId,
  initialTemplate,
}: Props) => {
  const ref = useRef<MDXEditorMethods>(null);
  const [content, setContent] = useState<string>(initialTemplate);

  const { mutate: mutateUpdateStudyTemplate, isPending: isSubmitting } =
    useUpdateStudyMutation(studyId, {
      onError: (error) => {
        console.error('❌ 스터디 템플릿 수정 실패', error);

        showToast({
          message: '스터디 템플릿 수정에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  const debouncedTemplate = useDebounce(content, 1000);

  useEffect(() => {
    if (debouncedTemplate === initialTemplate) {
      return;
    }

    mutateUpdateStudyTemplate({ templateContent: debouncedTemplate });
  }, [debouncedTemplate, initialTemplate, mutateUpdateStudyTemplate]);

  return (
    <div className="relative flex w-full flex-col items-end">
      <BaseEditor
        markdown={initialTemplate}
        editorRef={ref}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      {isSubmitting && (
        <span className="text-muted-foreground animate-fade-in absolute right-8 z-10 hidden text-sm transition-transform duration-200 ease-in-out md:block">
          <Spinner />
        </span>
      )}
    </div>
  );
};
