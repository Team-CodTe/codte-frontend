import { useTransition } from 'react';

import { useJoinStudyMutation } from '@/api/study/postJoinStudy/mutation';
import { PATH } from '@/constants/path';
import { buildUrlWithParams } from '@/lib/buildUrlWithParams';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
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

  const { mutate: mutateJoinStudy, isPending: isJoiningStudy } =
    useJoinStudyMutation({
      onSuccess: (data) => {
        showToast({ message: '스터디에 가입되었습니다.', type: 'success' });

        startTransition(() => {
          router.replace(
            buildUrlWithParams({
              url: PATH.STUDY.MAIN,
              pathParams: { studyId: data.id },
            }),
          );
        });
      },
      onError: (error) => {
        console.error('❌ 스터디 가입 실패', error);

        let toastMessage = '스터디 가입에 실패했습니다. 다시 시도해주세요.';
        let toastType: 'error' | 'info' = 'error';

        if (error instanceof FetchError) {
          const { errorCode, message } = (error.data as ApiErrorData) || {};

          if (errorCode === 'ALREADY_MEMBER' && message) {
            toastMessage = message;
            toastType = 'info';
          } else {
            toastMessage = '유효하지 않은 초대 코드입니다.';
          }
        }

        showToast({
          message: toastMessage,
          type: toastType,
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
      if (isJoiningStudy) {
        return;
      }

      mutateJoinStudy(value);
    },
  });

  const onQuit = async () => {
    form.reset();
    router.back();
  };

  return {
    form,
    onQuit,
    isSubmitting: isJoiningStudy || isNavigating,
  };
};
