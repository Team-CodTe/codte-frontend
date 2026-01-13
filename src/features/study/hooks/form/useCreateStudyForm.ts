import { useTransition } from 'react';

import { useCreateStudyMutation } from '@/api/study/postCreateStudy/mutation';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { showToast } from '@/lib/showToast';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  type StudyFormData,
  StudyFormSchema,
} from '../../schemas/studyForm.schema';

export const useCreateStudyForm = () => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const { mutate: mutateCreateStudy, isPending: isCreating } =
    useCreateStudyMutation({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ['study', 'my-studies'],
        });

        startTransition(() => {
          router.replace(
            buildUrlWithParams({
              url: PATH.STUDY.SPACE,
              pathParams: { studyId: data.id },
            }),
          );
        });

        showToast({ message: '스터디가 생성되었습니다.', type: 'success' });
      },
      onError: () => {
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
      if (isCreating) {
        return;
      }

      mutateCreateStudy(value);
    },
  });

  const handleQuit = () => {
    form.reset();
    router.back();
  };

  return {
    form,
    handleQuit,
    isSubmitting: isCreating || isNavigating,
  };
};
