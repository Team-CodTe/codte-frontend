import { useEffect } from 'react';

import { useUpdateStudyMutation } from '@/api/study/patchUpdateStudy/mutation';
import { showToast } from '@/lib/showToast';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';

import {
  type StudyFormData,
  StudyFormSchema,
} from '../schemas/studyForm.schema';

type Props = {
  id: string;
  initialData: StudyFormData;
};

export const useUpdateStudyForm = ({ id, initialData }: Props) => {
  const router = useRouter();

  const { mutate: mutateUpdateStudy, isPending: isSubmitting } =
    useUpdateStudyMutation(id, {
      onSuccess: () => {
        router.refresh();

        showToast({
          message: '스터디 정보가 수정되었습니다.',
          type: 'success',
        });
      },
      onError: (error) => {
        console.error('❌ 스터디 정보 수정 실패', error);

        showToast({
          message: '스터디 정보 수정에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  const form = useForm({
    defaultValues: initialData,
    validators: {
      onSubmit: StudyFormSchema,
    },
    onSubmit: ({ value }) => {
      if (isSubmitting) {
        return;
      }

      mutateUpdateStudy(value);
    },
  });

  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  const onReset = () => {
    form.reset(initialData);
  };

  return {
    form,
    isSubmitting,
    onReset,
  };
};
