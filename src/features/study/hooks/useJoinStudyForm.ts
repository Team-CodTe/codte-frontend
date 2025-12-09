import { useState } from 'react';

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

  const form = useForm({
    defaultValues: {
      inviteCode: '',
    } satisfies JoinStudyFormData as JoinStudyFormData,
    validators: {
      onSubmit: JoinStudyFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsSubmitting(true);

        /**  @todo API 호출 로직 추가 */
        console.log(value);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
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
