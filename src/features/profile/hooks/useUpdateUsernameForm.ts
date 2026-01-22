'use client';

import { useState, useTransition } from 'react';

import { useUpdateProfileMutation } from '@/api/user/patchUpdateProfile/mutation';
import { useValidateUsernameMutation } from '@/api/user/postValidateUsername/mutation';
import { useValidator } from '@/features/sign-up/hooks/useValidator';
import { FetchError } from '@/lib/fetchInstance';
import { handleApiError } from '@/lib/handleApiError';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const UsernameSchema = z
  .string()
  .min(2, '2글자 이상 입력해주세요.')
  .max(20, '20글자 이하로 입력해주세요.')
  .regex(
    /^[\uAC00-\uD7A3a-zA-Z0-9_-]+$/,
    '한글, 영문, 숫자, _, -만 입력 가능합니다.',
  );

const UsernameFormSchema = z.object({
  username: UsernameSchema,
});

type UsernameFormData = z.infer<typeof UsernameFormSchema>;

const getErrorMessage = (error: unknown) => {
  if (error instanceof FetchError && (error.data as ApiErrorData)?.message) {
    return (error.data as ApiErrorData).message;
  }

  return '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
};

type Props = {
  initialUsername: string;
};

export const useUpdateUsernameForm = ({ initialUsername }: Props) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutateAsync: validateUsernameApi } = useValidateUsernameMutation();

  const usernameValidator = useValidator({
    mutationFn: (username: string) => validateUsernameApi({ username }),
    onError: getErrorMessage,
  });

  const { mutate, isPending } = useUpdateProfileMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user', 'profile'],
      });

      startTransition(() => {
        router.refresh();
      });

      showToast({ message: '닉네임이 변경되었습니다.', type: 'success' });

      handleChangeOpen(false);
    },
    onError: (error) => {
      handleApiError({
        error,
        defaultMessage: '오류가 발생했습니다. 다시 시도해주세요.',
        defaultType: 'error',
      });
    },
  });

  const form = useForm({
    defaultValues: { username: initialUsername } satisfies UsernameFormData,
    validators: { onChange: UsernameFormSchema },
    onSubmit: async ({ value }) => {
      if (value.username === initialUsername) {
        return;
      }

      const isUsernameValid =
        usernameValidator.isValid &&
        usernameValidator.validatedValue === value.username;

      if (!isUsernameValid || isPending) {
        return;
      }

      mutate({ username: value.username });
    },
  });

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      form.reset();
      usernameValidator.reset();
    }
  };

  const handleValidate = () => {
    const value = form.getFieldValue('username');

    form.setFieldMeta('username', (prev) => ({ ...prev, isTouched: true }));

    if (value === initialUsername) {
      usernameValidator.setInvalid('현재 닉네임과 다른 닉네임을 입력해주세요.');

      return;
    }

    const result = UsernameSchema.safeParse(value);

    if (!result.success) {
      return;
    }

    usernameValidator.validate(value, value);
  };

  return {
    form,
    usernameValidator,
    handleValidate,
    isSubmitting: isPending || isNavigating,
    open,
    handleChangeOpen,
  };
};
