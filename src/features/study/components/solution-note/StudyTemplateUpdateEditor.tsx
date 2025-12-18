'use client';

import { useEffect, useState } from 'react';

import { useUpdateStudyMutation } from '@/api/study/patchUpdateStudy/mutation';
import { DynamicMarkdownEditor } from '@/components/common/MarkdownEditor';
import { useDebounce } from '@/hooks/useDebounce';
import { showToast } from '@/lib/showToast';

type Props = {
  studyId: number;
  initialTemplate: string;
};

export const StudyTemplateUpdateEditor = ({
  studyId,
  initialTemplate,
}: Props) => {
  const [content, setContent] = useState(initialTemplate);

  const { mutate: mutateUpdateStudyTemplate } = useUpdateStudyMutation(
    studyId,
    {
      onSuccess: () => {
        showToast({
          message: '저장되었습니다.',
          type: 'success',
        });
      },
      onError: (error) => {
        console.error('❌ 스터디 템플릿 수정 실패', error);

        showToast({
          message: '스터디 템플릿 수정에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    },
  );

  const debouncedTemplate = useDebounce(content, 1000);

  useEffect(() => {
    if (debouncedTemplate === initialTemplate) {
      return;
    }

    mutateUpdateStudyTemplate({ templateContent: debouncedTemplate });
  }, [debouncedTemplate, initialTemplate, mutateUpdateStudyTemplate]);

  return (
    <DynamicMarkdownEditor
      value={content}
      onChange={(val) => setContent(val || '')}
      placeholder="스터디 풀이 노트 템플릿을 작성해보세요."
    />
  );
};
