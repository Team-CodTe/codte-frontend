'use client';

import { useEffect, useState } from 'react';

import { useUpdateStudyMutation } from '@/api/study/patchUpdateStudy/mutation';
import { useDebounce } from '@/hooks/useDebounce';
import { showToast } from '@/lib/showToast';

import { BaseEditor } from './BaseEditor';

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
    <BaseEditor value={content} onChange={(val) => setContent(val || '')} />
  );
};
