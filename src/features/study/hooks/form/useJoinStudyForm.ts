import { useTransition } from 'react';

import { useJoinStudyMutation } from '@/api/study/postJoinStudy/mutation';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { handleApiError } from '@/lib/handleApiError';
import { showToast } from '@/lib/showToast';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import z from 'zod';

const JoinStudyFormSchema = z.object({
  inviteCode: z
    .string()
    .min(1, '초대 코드를 입력해주세요.')
    .max(200, '올바른 초대 코드를 입력해주세요.'),
});

type JoinStudyFormData = z.infer<typeof JoinStudyFormSchema>;

export const useJoinStudyForm = () => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const { mutate: mutateJoinStudy, isPending: isJoining } =
    useJoinStudyMutation({
      onSuccess: (data) => {
        startTransition(() => {
          router.replace(
            buildUrlWithParams({
              url: PATH.STUDY.MAIN,
              pathParams: { studyId: data.id },
            }),
          );
        });

        showToast({ message: '스터디에 가입되었습니다.', type: 'success' });
      },
      onError: (error) => {
        handleApiError({
          error,
          defaultMessage: '유효하지 않은 초대 코드입니다.',
          errorMapping: {
            ALREADY_MEMBER: (message) => ({ message, type: 'info' }),
          },
        });
      },
    });

  const form = useForm({
    defaultValues: {
      inviteCode: '',
    } satisfies JoinStudyFormData as JoinStudyFormData,
    validators: {
      onSubmit: JoinStudyFormSchema,
    },
    onSubmit: ({ value }) => {
      if (isJoining) {
        return;
      }

      mutateJoinStudy(value);
    },
  });

  const handleQuit = () => {
    form.reset();
    router.back();
  };

  return {
    form,
    handleQuit,
    isSubmitting: isJoining || isNavigating,
  };
};
