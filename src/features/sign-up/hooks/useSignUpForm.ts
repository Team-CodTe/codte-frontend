import { useCallback, useState, useTransition } from 'react';

import { useUpdateProfileMutation } from '@/api/user/patchUpdateProfile/mutation';
import { useValidateBojMutation } from '@/api/user/postValidateBoj/mutation';
import { useValidateUsernameMutation } from '@/api/user/postValidateUsername/mutation';
import { PATH } from '@/constants/path';
import { FetchError } from '@/lib/fetchInstance';
import { showToast } from '@/lib/showToast';
import { type ApiErrorData } from '@/types/apiErrorData';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { z } from 'zod';

import { type ValidationStatus } from '../types/validationStatus';

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

export const useSignUpForm = () => {
  const router = useRouter();
  const { update } = useSession();
  const [isNavigating, startTransition] = useTransition();
  const [usernameValidation, setUsernameValidation] = useState<{
    status: ValidationStatus;
    validatedValue: string;
  }>({ status: 'idle', validatedValue: '' });
  const [bojValidation, setBojValidation] = useState<{
    status: ValidationStatus;
    validatedValue: string;
  }>({ status: 'idle', validatedValue: '' });
  const [usernameApiError, setUsernameApiError] = useState<string | null>(null);
  const [bojApiError, setBojApiError] = useState<string | null>(null);

  const { mutate: mutateRegisterProfile, isPending: isRegisteringProfile } =
    useUpdateProfileMutation({
      onSuccess: async (data) => {
        try {
          await update({
            user: {
              ...data,
            },
          });

          startTransition(() => {
            resetUsernameValidation();
            resetBojValidation();

            router.replace(PATH.STUDY.HOME);
          });

          showToast({ message: '회원가입이 완료되었습니다.', type: 'success' });
        } catch (error) {
          console.error('❌ 유저 세션 업데이트 실패:', error);

          showToast({
            message:
              '회원 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.',
            type: 'error',
          });

          startTransition(async () => {
            await signOut({ redirect: false });

            resetUsernameValidation();
            resetBojValidation();

            router.replace(PATH.LOGIN);
          });
        }
      },
      onError: () => {
        showToast({
          message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          type: 'error',
        });
      },
    });

  const form = useForm({
    defaultValues: {
      username: '',
      bojUsername: '',
    } satisfies SignUpFormData,
    validators: {
      onChange: SignUpFormSchema,
    },
    onSubmit: async ({ value }) => {
      const isUsernameValid =
        usernameValidation.status === 'valid' &&
        usernameValidation.validatedValue === value.username;
      const isBojValid =
        bojValidation.status === 'valid' &&
        bojValidation.validatedValue === value.bojUsername;

      if (!isUsernameValid || !isBojValid) {
        return;
      }

      if (isRegisteringProfile) {
        return;
      }

      mutateRegisterProfile({
        username: value.username,
        bojUsername: value.bojUsername,
      });
    },
  });

  const validateUsernameMutation = useValidateUsernameMutation({
    onSuccess: (_, variables) => {
      setUsernameApiError(null);
      setUsernameValidation({
        status: 'valid',
        validatedValue: variables.username,
      });
    },
    onError: (error) => {
      setUsernameApiError(getErrorMessage(error));
      setUsernameValidation((prev) => ({
        ...prev,
        status: 'invalid',
      }));
    },
  });

  const validateBojMutation = useValidateBojMutation({
    onSuccess: (_, variables) => {
      setBojApiError(null);
      setBojValidation({
        status: 'valid',
        validatedValue: variables.bojUsername,
      });
    },
    onError: (error) => {
      setBojApiError(getErrorMessage(error));
      setBojValidation((prev) => ({
        ...prev,
        status: 'invalid',
      }));
    },
  });

  const validateUsername = useCallback(() => {
    const username = form.getFieldValue('username');

    const result = UsernameSchema.safeParse(username);

    if (!result.success) {
      form.setFieldMeta('username', (prev) => ({
        ...prev,
        isTouched: true,
      }));

      return;
    }

    setUsernameApiError(null);
    setUsernameValidation({ status: 'validating', validatedValue: '' });

    validateUsernameMutation.mutate({ username });
  }, [form, validateUsernameMutation]);

  const validateBojUsername = useCallback(() => {
    const bojUsername = form.getFieldValue('bojUsername');

    const result = BojUsernameSchema.safeParse(bojUsername);

    if (!result.success) {
      form.setFieldMeta('bojUsername', (prev) => ({
        ...prev,
        isTouched: true,
      }));

      return;
    }

    setBojApiError(null);
    setBojValidation({ status: 'validating', validatedValue: '' });

    validateBojMutation.mutate({ bojUsername });
  }, [form, validateBojMutation]);

  const resetUsernameValidation = useCallback(() => {
    setUsernameApiError(null);
    setUsernameValidation({ status: 'idle', validatedValue: '' });
  }, []);

  const resetBojValidation = useCallback(() => {
    setBojApiError(null);
    setBojValidation({ status: 'idle', validatedValue: '' });
  }, []);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof FetchError && (error.data as ApiErrorData)?.message) {
      return (error.data as ApiErrorData).message;
    }

    return '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  };

  return {
    form,
    validateUsername,
    validateBojUsername,
    resetUsernameValidation,
    resetBojValidation,
    usernameValidation,
    bojValidation,
    usernameApiError,
    bojApiError,
    isSubmitting: isRegisteringProfile || isNavigating,
  };
};
