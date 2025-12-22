'use client';

import { useState, useTransition } from 'react';

import { useUpdateStudyMutation } from '@/api/study/patchUpdateStudy/mutation';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';

type Props = {
  studyId: number;
  initialTemplate: string;
};

export const useUpdateStudyTemplate = ({ studyId, initialTemplate }: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const [content, setContent] = useState(initialTemplate);

  const { mutate: mutateUpdateStudyTemplate, isPending: isUpdating } =
    useUpdateStudyMutation(studyId, {
      onSuccess: () => {
        showToast({ message: '템플릿이 저장되었습니다.', type: 'success' });

        startTransition(() => {
          router.back();
        });
      },
      onError: (error) => {
        console.error('❌ 템플릿 수정 실패', error);

        showToast({
          message: '템플릿 수정에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  const onChange = (value?: string) => {
    setContent(value || '');
  };

  const onSubmit = () => {
    mutateUpdateStudyTemplate({ templateContent: content });
  };

  const onReset = () => {
    if (confirm('작성 중인 내용이 초기화됩니다. 계속하시겠습니까?')) {
      setContent(initialTemplate);
    }
  };

  const isDirty = content.trim().length > 0 && content !== initialTemplate;

  return {
    content,
    isDirty,
    isSubmitting: isUpdating || isNavigating,
    onChange,
    onSubmit,
    onReset,
  };
};
