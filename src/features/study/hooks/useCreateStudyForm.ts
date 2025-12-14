import { useTransition } from 'react';

import { useCreateStudyMutation } from '@/api/study/postCreateStudy/mutation';
import { PATH } from '@/constants/path';
import { showToast } from '@/lib/showToast';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';

import {
  type StudyFormData,
  StudyFormSchema,
} from '../schemas/studyForm.schema';

export const useCreateStudyForm = () => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const { mutate: mutateCreateStudy, isPending: isCreatingStudy } =
    useCreateStudyMutation({
      onSuccess: (data) => {
        showToast({ message: '스터디가 생성되었습니다.', type: 'success' });

        startTransition(() => {
          router.replace(`${PATH.STUDY.HOME}/${data.id}`);
        });
      },
      onError: (error) => {
        console.error('❌ 스터디 생성 실패', error);

        showToast({
          message: '스터디 생성에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      dailyProblemCount: 1,
      tierMin: 0,
      tierMax: 30,
      minSolved: null,
      maxSolved: null,
    } satisfies StudyFormData as StudyFormData,
    validators: {
      onSubmit: StudyFormSchema,
    },
    onSubmit: ({ value }) => {
      if (isCreatingStudy) {
        return;
      }

      mutateCreateStudy(value);
    },
  });

  const onQuit = async () => {
    form.reset();
    router.back();
  };

  return {
    form,
    onQuit,
    isSubmitting: isCreatingStudy || isNavigating,
  };
};
