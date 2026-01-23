'use client';

import { useTransition } from 'react';

import { useUpdateProfileMutation } from '@/api/user/patchUpdateProfile/mutation';
import { useValidateBojMutation } from '@/api/user/postValidateBoj/mutation';
import { useValidateUsernameMutation } from '@/api/user/postValidateUsername/mutation';
import { PATH } from '@/constants/path';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { useValidator } from './useValidator';

const UsernameSchema = z
  .string()
  .min(2, '2글자 이상 입력해주세요.')
  .max(20, '20글자 이하로 입력해주세요.')
  .regex(
    /^[\uAC00-\uD7A3a-zA-Z0-9_-]+$/,
    '한글, 영문, 숫자, _, -만 입력 가능합니다.',
  );

const BojUsernameSchema = z
  .string()
  .min(3, '3글자 이상 입력해주세요.')
  .max(50, '50글자 이하로 입력해주세요.')
  .regex(/^[a-zA-Z0-9]+$/, '영문, 숫자만 입력 가능합니다.');

const SignUpFormSchema = z.object({
  username: UsernameSchema,
  bojUsername: BojUsernameSchema,
});

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

const getErrorMessage = (error: unknown) => {
  if (error instanceof FetchError && (error.data as ApiErrorData)?.message) {
    return (error.data as ApiErrorData).message;
  }

  return '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
};

export const useSignUpForm = () => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const { mutateAsync: validateUsernameApi } = useValidateUsernameMutation();
  const { mutateAsync: validateBojApi } = useValidateBojMutation();

  const usernameValidator = useValidator({
    mutationFn: (username: string) => validateUsernameApi({ username }),
    onError: getErrorMessage,
  });

  const bojValidator = useValidator({
    mutationFn: (bojUsername: string) => validateBojApi({ bojUsername }),
    onError: getErrorMessage,
  });

  const { mutate: mutateRegisterProfile, isPending: isRegistering } =
    useUpdateProfileMutation({
      onSuccess: () => {
        startTransition(() => {
          router.replace(PATH.DASHBOARD);
        });
        showToast({ message: '회원가입이 완료되었습니다.', type: 'success' });
      },
      onError: () =>
        showToast({ message: '오류가 발생했습니다.', type: 'error' }),
    });

  const form = useForm({
    defaultValues: { username: '', bojUsername: '' } satisfies SignUpFormData,
    validators: { onChange: SignUpFormSchema },
    onSubmit: async ({ value }) => {
      const isUsernameValid =
        usernameValidator.isValid &&
        usernameValidator.validatedValue === value.username;
      const isBojValid =
        bojValidator.isValid &&
        bojValidator.validatedValue === value.bojUsername;

      if (!isUsernameValid || !isBojValid || isRegistering) {
        return;
      }

      mutateRegisterProfile({
        username: value.username,
        bojUsername: value.bojUsername,
      });
    },
  });

  const handleValidate = (field: 'username' | 'bojUsername') => {
    const value = form.getFieldValue(field);
    const schema = field === 'username' ? UsernameSchema : BojUsernameSchema;
    const validator = field === 'username' ? usernameValidator : bojValidator;

    const result = schema.safeParse(value);

    if (!result.success) {
      form.setFieldMeta(field, (prev) => ({ ...prev, isTouched: true }));

      return;
    }

    validator.validate(value, value);
  };

  return {
    form,
    usernameValidator,
    bojValidator,
    handleValidate,
    isSubmitting: isRegistering || isNavigating,
  };
};
