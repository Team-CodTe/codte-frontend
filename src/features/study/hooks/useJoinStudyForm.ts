import { useState } from 'react';

import { useJoinStudyMutation } from '@/api/study/postJoinStudy/mutation';
import { PATH } from '@/constants/path';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const joinStudyMutation = useJoinStudyMutation({
    onSuccess: (data) => {
      showToast({ message: '스터디에 가입되었습니다.', type: 'success' });

      router.replace(`${PATH.STUDY.HOME}/${data.studyId}`);
    },
    onError: (error) => {
      console.error('❌ 스터디 가입 실패', error);

      if (error instanceof FetchError) {
        const data = error.data as ApiErrorData | null;
        const errorCode = data?.error?.code;
        const errorMessage = data?.error?.message;

        if (errorCode === 'ALREADY_MEMBER' && errorMessage) {
          showToast({
            message: errorMessage,
            type: 'info',
          });
        } else {
          showToast({
            message: '스터디 가입에 실패했습니다. 다시 시도해주세요.',
            type: 'error',
          });
        }
      } else {
        showToast({
          message: '스터디 가입에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
      }
    },
    onSettled: () => {
      setIsSubmitting(false);
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
      setIsSubmitting(true);

      joinStudyMutation.mutate(value);
    },
  });

  const onQuit = async () => {
    form.reset();
    router.back();
  };

  return {
    form,
    onQuit,
    isSubmitting,
  };
};
