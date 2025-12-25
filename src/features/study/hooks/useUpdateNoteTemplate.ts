import { useState, useTransition } from 'react';

import { useUpdateStudyMutation } from '@/api/study/patchUpdateStudy/mutation';
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';

type Props = {
  studyId: number;
  initialTemplate: string;
};

export const useUpdateNoteTemplate = ({ studyId, initialTemplate }: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const [templateContent, setTemplateContent] = useState(initialTemplate);

  const { mutate: mutateUpdateNoteTemplate, isPending: isUpdating } =
    useUpdateStudyMutation(studyId, {
      onSuccess: () => {
        startTransition(() => {
          router.back();
        });

        showToast({ message: '템플릿이 저장되었습니다.', type: 'success' });
      },
      onError: () => {
        showToast({
          message: '템플릿 수정에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  const onChange = (value?: string) => {
    setTemplateContent(value || '');
  };

  const onSubmit = () => {
    if (isUpdating) {
      return;
    }

    mutateUpdateNoteTemplate({ templateContent });
  };

  const onReset = () => {
    setTemplateContent(initialTemplate);
  };

  return {
    templateContent,
    isDirty:
      templateContent.trim().length > 0 && templateContent !== initialTemplate,
    isSubmitting: isUpdating || isNavigating,
    onChange,
    onSubmit,
    onReset,
  };
};
